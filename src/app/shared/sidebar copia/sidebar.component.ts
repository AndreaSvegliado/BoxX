import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { currentUser } from 'src/app/models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  opened = false;

  isLoggedIn: boolean;
  currUser: currentUser;
  
  //Versione Vasco: observable che si aggiorna in automatico al variare della variabile
  //AS: il dollaro indica che la variabile è un observable
  //isLoggedIn$: Observable<boolean>;
  //isLoggedOut$: Observable<boolean>;
  //pictureUrl$: Observable<string>;
  //UserName$: Observable<string>;

  constructor(private router: Router, private uService: UserService ) {
    //Ho messo la routine nel constructor perchè ci passa mentre nell'onInit non passa se F5 su login!
    
  }

  ngOnInit() {
    //console.log("DEBUG: sidebar ngOnInit");
    //console.log(localStorage.getItem('currentUser'));
    this.uService.obsLoggedIn.subscribe(val => this.isLoggedIn = val)

    if(localStorage.getItem('currentUser') != null){
      //console.log("DEBUG: check currentUser sidebar ngOnInit");
      
      /*
      this.userDetails = JSON.parse(localStorage.getItem('currentUser'));

      for (let prop in this.userDetails ) {
        if(prop == "fullname"){
          //console.log(this.userDetails [prop]);
          this.userFullName = this.userDetails [prop];
          break;
        }
      }
      */

      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  onLogout() {
    //this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    this.currUser = null;
    this.uService.Logout();

    this.uService.changeLoggedIn(false);
    this.router.navigate(['/user/login']);
  }
}

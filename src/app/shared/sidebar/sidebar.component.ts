import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  //AS - eventEmitter
  public user$: Observable<Object>;
  public isLoggedIn$: Observable<boolean>;

  @Output("loggedIn") loggedInEvent = new EventEmitter<Object>();



  
  //@Input() public isLoggedIn;     ///?????


  userDetails: Object;

  //Versione Vasco: observable che si aggiorna in automatico al variare della variabile
  //AS: il dollaro indica che la variabile è un observable
  //isLoggedIn$: Observable<boolean>;
  //isLoggedOut$: Observable<boolean>;
  //pictureUrl$: Observable<string>;
  //UserName$: Observable<string>;

  
  constructor(private router: Router, private uService: UserService) {


   }

  ngOnInit() {

    console.log("---- onInit ----");

    if(localStorage.getItem('token') != null){
      this.uService.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
          console.log(this.userDetails);
          //this.isLoggedIn = true;
  
          //console.log("MERDA!!!");
          //console.log(this.isLoggedIn);

        },
        err => {
          //this.isLoggedIn = false;
          console.log(err);
        },
      );
    } 
    

    //AS - eventEmitter
    this.user$ =  this.uService.getUserProfile();
    this.loggedInEvent.emit(this.userDetails);

    //this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    //console.log ("loggedin",this.isLoggedIn$);
    //this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn ));
    //this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ?  user.photoURL: null));
    //this.UserName$ = this.afAuth.authState.pipe(map(user => user ?  user.displayName: null));

  }

  onLogout() {
    //this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    this.userDetails = null;

    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  opened = false;

  isLoggedIn: boolean;
  userDetails: Object;
  userFullName: string;

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
    console.log("DEBUG: sidebar ngOnInit");
    console.log(localStorage.getItem('currentUser'));
    this.uService.obsLoggedIn.subscribe(val => this.isLoggedIn = val)

    if(localStorage.getItem('currentUser') != null){
      console.log("DEBUG: check currentUser sidebar ngOnInit");
      this.userDetails = JSON.parse(localStorage.getItem('currentUser'));

      for (let prop in this.userDetails ) {
        if(prop == "fullname"){
          //console.log(this.userDetails [prop]);
          this.userFullName = this.userDetails [prop];
          break;
        }
      }
    }
    //voglio che sidebar sia istantaneamente aggiornata quanto cambia il valore di isLoggedIn
    //per questo faccio la subscribe all'observable rappresentato dal service


    /*
    // Se presente un token valido, recupero i dati dell'utente
    if(localStorage.getItem('appUser') != null){
      console.log("sidebar/ngOnInt getUserProfile");
      
      this.uService.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
          console.log("sidebar-component\ngOnInt: ", this.userDetails);
        },
        err => {
          console.log(err);
        },
      );
    } 
    */  

    //AS - eventEmitter
    //this.user$ =  this.uService.getUserProfile();
    //this.loggedInEvent.emit(this.userDetails);

    //this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    //console.log ("loggedin",this.isLoggedIn$);
    //this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn ));
    //this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ?  user.photoURL: null));
    //this.UserName$ = this.afAuth.authState.pipe(map(user => user ?  user.displayName: null));

  }

  onLogout() {
    //this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    this.userDetails = null;

    //localStorage.removeItem('token');
    //localStorage.removeItem('currentUser');
    this.uService.Logout();

    this.uService.changeLoggedIn(false);
    this.router.navigate(['/user/login']);
  }


}

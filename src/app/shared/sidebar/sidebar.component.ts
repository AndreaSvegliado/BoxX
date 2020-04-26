import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoggedinService } from "../../user/service/loggedin.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  userDetails: Object;
  isLoggedIn: boolean;

  //Versione Vasco: observable che si aggiorna in automatico al variare della variabile
  //AS: il dollaro indica che la variabile è un observable
  //isLoggedIn$: Observable<boolean>;
  //isLoggedOut$: Observable<boolean>;
  //pictureUrl$: Observable<string>;
  //UserName$: Observable<string>;

  
  constructor(private router: Router, private uService: UserService, private isLoggedInService: LoggedinService ) { }

  ngOnInit() {

    //su Init va a vedere se è LoggedIn (potrei usare il servizio solo?)
    if(localStorage.getItem('token') != null){
      this.uService.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
          console.log(this.userDetails);
          this.isLoggedIn  = true;

        },
        err => {
          console.log(err);
          this.isLoggedIn = false;
        },
      );
    }  else {
      this.isLoggedIn = false;
    }
    
    //voglio che sidebar sia istantaneamente aggiornata quanto cambia il valore di isLoggedIn
    //per questo faccio la subscribe all'observable rappresentato dal service
    this.isLoggedInService.currentVal.subscribe(a => this.isLoggedIn = a)
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

    localStorage.removeItem('token');
    this.isLoggedInService.changeVal(false);
    this.router.navigate(['/user/login']);
  }

  gotoUrl(url:string){
    window.location.href=url;
  }

}

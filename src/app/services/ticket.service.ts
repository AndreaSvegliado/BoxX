import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticket, currentUser } from '../models/models';



@Injectable({
  providedIn: 'root'
})

export class TicketService  {


  currUser: currentUser;
  

  constructor(private http: HttpClient) {
    
   }

   getTicketList(): Observable<ticket[]>
   {

    if(localStorage.getItem('currentUser') != null){
       
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(this.currUser);

    }
    
     //return this.http.get<Ticket[]>(environment.apiBaseURI + '/Ticket'); 
     //return this.http.get<Ticket[]>(environment.apiBaseURI + '/Ticket?badge=666');     //QUI: filtro per utente loggato!!!!
     return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket?badge=' + this.currUser.badge);     


     /*
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

      
   }
}


/*

getTicketList(): Observable<Ticket[]>
  {
    //return this.http.get<Ticket[]>(environment.apiBaseURI + '/Ticket'); 
    //return this.http.get<Ticket[]>(environment.apiBaseURI + '/Ticket?badge=666');     //QUI: filtro per utente loggato!!!!
    return this.http.get<Ticket[]>(this.BaseURI + '/Ticket?badge=666');     //QUI: filtro per utente loggato!!!!
  }

  /*
  getTicketList(): Observable<Ticket[]>  {
    const params = new HttpParams()
      .set("page","1")
      .set("pageSize", "10");

      console.log("STEP1");
    return this.http.get<Ticket[]>(environment.apiBaseURI + '/ticket' , {params});
  }
*/
 
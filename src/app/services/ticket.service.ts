import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticket } from '../models/models';



@Injectable({
  providedIn: 'root'
})

export class TicketService  {




  constructor(private http: HttpClient) {
    
   }

   getTicketList(): Observable<ticket[]>
   {
     //return this.http.get<Ticket[]>(environment.apiBaseURI + '/Ticket'); 
     //return this.http.get<Ticket[]>(environment.apiBaseURI + '/Ticket?badge=666');     //QUI: filtro per utente loggato!!!!
     return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket?badge=666');     //QUI: filtro per utente loggato!!!!
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
 
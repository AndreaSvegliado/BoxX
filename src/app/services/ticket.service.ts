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
    if(localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
    
    return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket?badge=' + this.currUser.badge);     

  }

  getTicket(ticket: string){
    return this.http.get(environment.apiBaseUrl  + '/Ticket/' + ticket );
  }
}


 
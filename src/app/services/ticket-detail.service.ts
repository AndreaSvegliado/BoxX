


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticketDetail } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class TicketDetailService {

  constructor(private http: HttpClient) {
    
  }

  getTicketDetailList(ticketID): Observable<ticketDetail[]>
  {
    //AS: QUI!!!! sistemare WS !!!! è giusta la seconda ma non restituisce la join della causale !!!
    return this.http.get<ticketDetail[]>(environment.apiBaseUrl + '/TicketDetails?GetByTicketID=' + ticketID); 
    //return this.http.get<ticketDetail[]>(environment.apiBaseUrl + '/TicketDetails/GetByTicketID/' + ticketID); 
    //http://188.152.211.199/iQWApi/api/ticketDetails/GetByTicketID/2    
  }
}


 
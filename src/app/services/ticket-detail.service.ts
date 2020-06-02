


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
    return this.http.get<ticketDetail[]>(environment.apiBaseUrl + '/TicketDetails?GetByTicketID=' + ticketID);     
  }
}


 
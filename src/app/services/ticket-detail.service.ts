


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticketDetail } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class TicketDetailService {

  formData:ticketDetail;

  constructor(private http: HttpClient) {
  
  }

  getTicketDetailList(ticketID): Observable<ticketDetail[]>
  {
    return this.http.get<ticketDetail[]>(environment.apiBaseUrl + '/TicketDetails/GetByTicketID/' + ticketID); 
  }

  postTicketDetail(){
    return this.http.post( environment.apiBaseUrl   + '/TicketDetails',this.formData)  

  }  
  
  putTicketDetail(){
    return this.http.put( environment.apiBaseUrl  + '/TicketDetails/' + this.formData.id,this.formData)    
  }

  deleteTicketDetail(  id  ){
    return this.http.delete(  environment.apiBaseUrl  + '/TicketDetails/' + id ) ;
  }
}


 
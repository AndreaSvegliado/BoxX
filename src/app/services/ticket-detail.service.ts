


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
  ticketList: ticketDetail[];

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

  refreshList(ticketID){

    console.log("refreshList - ticketID :");
    console.log(ticketID);
    
    //AS: niente return ??
     //this.http.get(  environment.apiBaseURI + '/PaymentDetail')
     this.http.get(  environment.apiBaseUrl+ '/TicketDetails/GetByTicketID/' + ticketID)
    .toPromise()            //AS ???
    .then(res => this.ticketList = res as ticketDetail[] );
  }

}


 
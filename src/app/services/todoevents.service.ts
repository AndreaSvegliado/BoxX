import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { todoEvent, currentUser } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class TodoEventsService {
  currUser: currentUser;

  
  constructor(private http: HttpClient) {
    
  }

  getTodoList(): Observable<todoEvent[]>
  {
    if(localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    //http://188.152.211.199/iQWApi/api/TodoEvents/GetByBadge/666
    //return this.http.get<todoEvent[]>(environment.apiBaseUrl + '/TodoEvents/GetByBadge/' + this.currUser.badge);     
    //return this.http.get<todoEvent[]>(environment.apiBaseUrl + '/TodoEvents/GetByUserID/' + this.currUser.userID);     

    //TEMPORANEO (niente filtro per utente):
    return this.http.get<todoEvent[]>(environment.apiBaseUrl + '/TodoEvents/');     

  }

  getTodoEvent(todoEvent: number){
    return this.http.get(environment.apiBaseUrl  + '/TodoEvents/' + todoEvent );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class LoggedinService {

  private valSource = new BehaviorSubject(false);
  currentVal = this.valSource.asObservable();

  constructor() { }

  changeVal(val: boolean) {
    this.valSource.next(val)
    console.log ("isLoggedIn viene impostato a "+ val)
  }

}
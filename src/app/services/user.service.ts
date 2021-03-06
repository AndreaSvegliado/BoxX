import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { currentUser } from '../models/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private BehaviourSubjectLoggedIn = new BehaviorSubject<boolean>(false);
  obsLoggedIn = this.BehaviourSubjectLoggedIn.asObservable();

  private BehaviourSubjectcurrentUser: BehaviorSubject<currentUser>;
  public obscurrentUser: Observable<currentUser>;

  public currUser: currentUser;

  //readonly BaseURI = "http://188.152.211.199/iQWApi/api";
  readonly BaseURI = environment.apiBaseUrl;


  constructor(private fb: FormBuilder, private http: HttpClient) {

    //The BehaviorSubject holds the value that needs to be shared with other components
    this.BehaviourSubjectcurrentUser = new BehaviorSubject<currentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.obscurrentUser = this.BehaviourSubjectcurrentUser.asObservable();
  }

  formModel = this.fb.group(
    {
      UserName: ['', Validators.required],
      Email: ['', Validators.email],
      FullName: [''],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      },
        {
          validator: this.comparePasswords
        }
      )
    });

  //Login(userName: string, userPwd: string) {
  Login(formData) {
    return this.http.post<currentUser>(this.BaseURI + '/ApplicationUser/Login', formData)
      .pipe(map(user => {
        if (user && user.token) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('token', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currUser = user;

          this.BehaviourSubjectcurrentUser.next(user);
        }
        return user;
      }));
  }

  Logout() {
    //console.log("DEBUG: User.service/Logout");
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  Register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  public get currentUserValue(): currentUser {
    return this.BehaviourSubjectcurrentUser.value;
  }


  //AS: VERIFICARE
  getUserProfile(appUser: string) {
    //AS: sostituito da auth.interceptor
    //var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    //return tokenHeader;

    //return this.http.get(this.BaseURI + '/UserProfile', {headers: tokenHeader});
    //headers : req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token)'))

    //auth.interceptor
    //return this.http.get(environment.apiBaseURI + '/UserProfile', );
    //return this.http.get(this.BaseURI  + '/UserProfile', );

    //var localUser = localStorage.getItem('appUser');

    //console.log("DEBUG -getUserProfile:" + this.BaseURI  + '/ApplicationUser/'+ localUser );
    //return this.http.get(this.BaseURI  + '/ApplicationUser/' + this.formModel.value.UserName, );
    return this.http.get(this.BaseURI + '/ApplicationUser/' + appUser,);

  }

  changeLoggedIn(val: boolean) {
    this.BehaviourSubjectLoggedIn.next(val)

    //console.log ("user.service.ts - isLoggedIn viene impostato a "+ val)
  }

  //AS: custom validator
  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //comfirmPasswordCtrl.errors{passwordMismatch:true};
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
//import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private BehaviourSubjectLoggedIn = new BehaviorSubject(false);
  obsLoggedIn = this.BehaviourSubjectLoggedIn.asObservable();

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  //readonly BaseURI = "https://localhost:44306/api";
  readonly BaseURI = "http://188.152.211.199/iQWApi/api";
  
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

  //AS: custom validator
  comparePasswords(fb: FormGroup )
  {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //comfirmPasswordCtrl.errors{passwordMismatch:true};
    if(confirmPasswordCtrl.errors == null|| 'passwordMismatch' in confirmPasswordCtrl.errors){
      if( fb.get('Password').value !=  confirmPasswordCtrl.value )
        confirmPasswordCtrl.setErrors({passwordMismatch:true});
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }

  Register()
  {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    //return  this.http.post(environment.apiBaseURI +'/ApplicationUser/Register', body );
    return  this.http.post(this.BaseURI +'/ApplicationUser/Register', body );
  }

  Login(formData){
    //return this.http.post(environment.apiBaseURI +'/ApplicationUser/Login', formData );
    return this.http.post(this.BaseURI  +'/ApplicationUser/Login', formData );
  }

  getUserProfile(){
    //AS: sostituito da auth.interceptor
    //var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    //return tokenHeader;

    //return this.http.get(this.BaseURI + '/UserProfile', {headers: tokenHeader});
    //headers : req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token)'))

    //auth.interceptor
    //return this.http.get(environment.apiBaseURI + '/UserProfile', );
    return this.http.get(this.BaseURI  + '/UserProfile', );
  }

  changeLoggedIn(val: boolean) {
    this.BehaviourSubjectLoggedIn.next(val)
    console.log ("user.service.ts - isLoggedIn viene impostato a "+ val)
  }

}

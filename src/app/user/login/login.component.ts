import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
//import { ToastrService,  ToastrModule, ToastContainerModule  } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  
  @Output() public Event_isLoggedIn= new EventEmitter();
  
  formModel={
    UserName:'',
    Password:''
  };
    constructor(private service: UserService, private router:Router) { 
    //constructor(private service: UserService, private router:Router,  private toastr: ToastrService) { 
  }

  ngOnInit() {
    if(localStorage.getItem('token') != null){

      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(form:NgForm){

    console.log("Login: " + this.formModel.UserName);

    this.service.Login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);

        this.Event_isLoggedIn.emit(true);
        this.router.navigateByUrl('/home');
      },
      err=> {
        this.Event_isLoggedIn.emit(false);
        if(err.status== 400)
          //this.toastr.error("Utente o password errati", "Autenticazione fallita");
          console.log(err);
        else
          console.log(err);
      }
    );
  }
}

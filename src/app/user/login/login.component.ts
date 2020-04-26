import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  
  formModel={
    UserName:'',
    Password:''
  };
    //constructor(private uService: UserService, private router:Router ) { 
    constructor(private uService: UserService, private router:Router, private snackbar : MatSnackBar) { 
  }

  

  ngOnInit() {
    if(localStorage.getItem('token') != null){

      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(form:NgForm){

    console.log("Login: " + this.formModel.UserName);

    this.uService.Login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.uService.changeLoggedIn(true);
        this.snackbar.open("Login Corretta", "Benvenuto");
        this.router.navigateByUrl('/home');

      },
      err=> {
        
        this.uService.changeLoggedIn(false);
        if(err.status== 400) {
          this.snackbar.open("Utente o Password errati", "Riprova");
        }
        else {
          this.snackbar.open(err, "");
        }
      }
    );
  }
}


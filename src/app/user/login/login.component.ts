import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  formModel={
    UserName:'',
    Password:''
  };
  //constructor(private uService: UserService, private router:Router ) { 
  constructor(private uService: UserService, private router:Router, private snackBar : MatSnackBar) { 

    
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
        //this.snackbar.open("Login Corretta", "Benvenuto");
        this.ShowMessage("Login Corretta", "Benvenuto");
        this.router.navigateByUrl('/home');

      },
      err=> {
        
        this.uService.changeLoggedIn(false);
        if(err.status== 400) {
          this.ShowMessage("Utente o Password errati", "Riprova");
        }
        else {
          this.ShowMessage(err,"");
        }
      }
    );
  }

  ShowMessage(msg: string, title: string) {

    let config = new MatSnackBarConfig();
    config.verticalPosition  = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    //config.announcementMessage = "ciao";
    //config.panelClass =  'ng-deep';


    //config.extraClasses = this.addExtraClass ? ['test'] : undefined;
    if(title != "")
      this.snackBar.open(msg, title, config);  
    else
      this.snackBar.open(msg,null, config);  
  }
}


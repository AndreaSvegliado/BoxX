import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

//import { keyframes } from '@angular/animations';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  //constructor(public service: UserService, private toastr: ToastrService) { }
  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){

    this.service.Register().subscribe(
      (res: any) => {
        if(res.Succeeded){
          this.service.formModel.reset();
          //this.toastr.success('Utente creato correttamente', 'Operazione effettuata');
        }
        else{
          //AS: ATTENZIONE maiuscole!!!  
          res.Errors.forEach(element => {
            switch(element.Code)
            {
              case 'DuplicateUserName':
                //username already taken
                //this.toastr.error('Utente già registrato', 'Operazione fallita');
                break;
              default:
                //registration is failed
                //this.toastr.error(element.Code, 'Operazione fallita');
                break;
            }
          });
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}

import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { ticketCausale } from 'src/app/models/models';
import { TicketCausaliService } from 'src/app/services/ticket-causali.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';



/*
Questa prima parte (NgbDateAdapter) gestisce il collegamento con ngModel
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      console.log(parseInt(date[0], 10));
      return {
        day : parseInt(date[2], 10), //qui su stackblitz si trova parseInt(date[0], 10),....che non è il day
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10) //qui su stackblitz si trova parseInt(date[2], 10),....che non è il year
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
    //return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null; era così...invertito
  }
}

/*
Questa seconda parte (NgbDateParserFormatter) gestisce come la data inserita da tastiera viene gestita
(cioè uno deve digitare 13/3/2020 e non 3/13/2020)
 */

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}



@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['../ticket.css'],

  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},

  ],
  encapsulation: ViewEncapsulation.None // <------

})




export class TicketDetailComponent implements OnInit {

  spinners = false;
  time = {hour: 13, minute: 30};
  toggleSpinners() {
      this.spinners = !this.spinners;
  }

  ticketCausali:ticketCausale[];

  constructor(public serviceDetails: TicketDetailService, public serviceCausali: TicketCausaliService) { 

    this.serviceCausali.getCausaliList()
    .subscribe(
      res=>   this.ticketCausali = res as ticketCausale[]
      );  


  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!= null)
      form.resetForm();
      
    this.serviceDetails.formData ={
      id: 0,
      ticketID: 0,
      causaleID: 0,
      causale:null,
      dt: null,
      h_Ini: null,
      h_End: null,
      note: null
    }
  }


  onSubmit(form:NgForm){
    //form.value        //AS: oggetto in formato JSON contenente i campi del form

    console.log(this.serviceDetails.formData.id);

    //if(form.value.PMid==0){
    if(this.serviceDetails.formData.id ==0){
      this.InsertRecord(form);
    }
    else{
      this.UpdateRecord(form);
    }
  }

  InsertRecord(form:NgForm){
    
    console.log("Insert Record (TODO!!!)");

    
/*
    this.service.postTicketDetail().subscribe(
      res => { 
        this.resetForm(form);
        //this.toastr.success('Record inserito correttamente', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {console.log(err);  }
    )
  */
  }

  UpdateRecord(form:NgForm){
    console.log("Update Record (TODO!!!)");

    
    /*this.serviceDetails.putTicketDetail();
    /*
    this.serviceDetails.putTicketDetail().subscribe(
      res => { 
        this.resetForm(form);
        //this.toastr.info('Record aggiornato correttamente', 'Payment Detail Register');
        //this.serviceDetails.refreshList();
      },
      err => {console.log(err);  }
    )
    */
  }
}


export class NgbdDatepickerAdapter {

  model1: string;
  model2: string;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {}

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}


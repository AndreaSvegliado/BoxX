import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { ticketCausale, ticketDetail } from 'src/app/models/models';
import { TicketCausaliService } from 'src/app/services/ticket-causali.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, NumberSymbol } from '@angular/common';
import { stringify } from 'querystring';


interface TimeStructure {
  hour: number;
  minute: number;
}

/*
Questa prima parte (NgbDateAdapter) gestisce il collegamento con ngModel
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);

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
  encapsulation: ViewEncapsulation.None // <------ serve per poter modificare css delle classi create da Angular

})




export class TicketDetailComponent implements OnInit {

  spinners = false;

  convert2Int(oraStringa:string){
    return oraStringa ? parseInt(oraStringa) : 0;
  }

  toggleSpinners() {
      this.spinners = !this.spinners;
  }

  timeFormat = new StringTimeFormat();

  ticketCausali:ticketCausale[];
  ticketDetails:ticketDetail[];

  constructor(public serviceDetails: TicketDetailService, public serviceCausali: TicketCausaliService) { 

    this.serviceCausali.getCausaliList()
    .subscribe(
      res=>   this.ticketCausali = res as ticketCausale[]
      );  
    

    //this.timechanged = new DatePipe('it-IT').transform(this.serviceDetails.formData.h_Ini, 'HH:mm');
      

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

    console.log("Submit");
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

    
    //this.serviceDetails.putTicketDetail();
    
    this.serviceDetails.putTicketDetail().subscribe(
      res => { 
        //this.toastr.info('Record aggiornato correttamente', 'Payment Detail Register');
        console.log("TicketID da salvare: " + this.serviceDetails.formData.ticketID);
        this.serviceDetails.refreshList(this.serviceDetails.formData.ticketID);
        this.resetForm(form);
      },
      err => {
        console.log(err); 
      }
    )

  }


}




function pad(number): string {
  return number < 10 ? `0${number}` : number;
}

function equal(t1: TimeStructure, t2: TimeStructure): boolean {
  if (!t1) {
    return !t2;
  }
  return (!t1 && !t2) || (t1 && t2 && t1.hour === t2.hour && t1.minute === t2.minute);
}

export class NgbdDatepickerAdapter {

  model1: string;
  model2: string;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {}

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}


class StringTimeFormat {
  private currentValue: TimeStructure;

  toStructure(timeAsString: string): TimeStructure {
    if (!timeAsString) {
      this.currentValue = null;
    }
    else {
      const parts = timeAsString.split(':');
      const newValue = {
        hour: +parts[0],
        minute: +parts[1]
      };

      if (!equal(this.currentValue, newValue)) {
        this.currentValue = newValue;
      }
    }
    return this.currentValue;
  }

  fromStructure(t: TimeStructure): string {
    return t && `${pad(t.hour)}:${pad(t.minute)}}`;
  }
}
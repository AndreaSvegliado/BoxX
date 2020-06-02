import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['../ticket.css']
})

export class TicketDetailsComponent implements OnInit {

  mticketID: string;

  constructor( private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    let ID = this.route.snapshot.params['ID'];
    this.mticketID = ID;

    //this.ticketService.getTicketDetail(ID).subscribe(t =>{  
    //  this.ticket = t;

  }

  BackToHome(){
    this.router.navigate(['/default']);

    // per tornare alla home l'ID del ticket corrente (ed eventualemtne evidenziarlo)
    //let selectID = this.ticket.ID ? this.ticket.ID:null;
    //this.router.navigate(['/home', {id:selectID}]);      

  }
}

/* OLD - Versione con l'injection del ticketService

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

import{ ticket } from 'src/app/models/models';
import { TicketService } from 'src/app/services/ticket.service';

//import { TicketTimesheetService } from '../shared/ticketTimesheet.service';
//import { TicketTimesheet } from '../model/ticketTimesheet.model';


@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})

export class TicketDetailsComponent implements OnInit {
  //ticket:any;
  ticket:ticket;

  timesheetForms: FormArray = this.fb.array([]);

  //constructor(private route: ActivatedRoute, private router : Router, private fb: FormBuilder, private ticketService: TicketService, private timesheetService: TicketTimesheetService ) { }
  constructor(private route: ActivatedRoute, private router : Router, private fb: FormBuilder, private ticketService: TicketService ) { }

  ngOnInit() {

    let ID = this.route.snapshot.params['ID'];

  }

  addRowForm(){

  }
  
  addTimesheetForm(){
    this.timesheetForms.push(this.fb.group({
      ID : [0],
      TicketID : ['', Validators.required],
      Data : ['', Validators.required],
      Andata_Start: ['', Validators.required],
      Andata_End: ['', Validators.required]
    }))
  }
 

}
*/
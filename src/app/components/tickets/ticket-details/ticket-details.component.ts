import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';

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

    // per tornare alla home l'ID del ticket corrente (ed eventualmetne evidenziarlo)
    //let selectID = this.ticket.ID ? this.ticket.ID:null;
    //this.router.navigate(['/home', {id:selectID}]);      

  }



  
  // dragMoved(event: CdkDragMove) {
  //   this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  //   //console.log (this.position);
  // }


  
  @ViewChild('divdetail') divDetail: ElementRef;
  @ViewChild('divdetaillist') divDetailList: ElementRef;

  tr3dDetail;
  tr3dDetailList;

  dragEndedDetail(event: CdkDragEnd) {
      //let xDetail = this.tr3dDetail;
      //let xDetailList = this.tr3dDetailList;
      let xDetail = this.divDetail.nativeElement.getBoundingClientRect().x
      let xDetailList = this.divDetailList.nativeElement.getBoundingClientRect().x
      let wDetail = this.divDetail.nativeElement.offsetWidth
      let wDetailList = this.divDetailList.nativeElement.offsetWidth
      console.log("xDetail " + xDetail);
      console.log("wDetail " + wDetail);
      console.log("xDetailList " + xDetailList);
      console.log("wDetailList " + wDetailList);
      console.log("------------------");
      event.source._dragRef.reset();
      if (xDetail >= xDetailList) {
        console.log ("swap => perchè xDetail= "+xDetail +" > xDetailist= "+xDetailList);
        //swap

        this.tr3dDetail = wDetailList;
        this.tr3dDetailList = - wDetail;

      } else {
        console.log ("swap <= perchè xDetail= "+xDetail +" < xDetailist= "+xDetailList);
        //swap

        this.tr3dDetail = 0;
        this.tr3dDetailList = 0;

        this.divDetail.nativeElement.style.transform = 'none'
        this.divDetailList.nativeElement.style.transform = 'none'
        
        //this.tr3dDetail = 0;
        //this.tr3dDetailList = 0;
      }
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
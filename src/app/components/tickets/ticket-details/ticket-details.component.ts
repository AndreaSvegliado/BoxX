import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { TicketService } from 'src/app/services/ticket.service';
import { ticket } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['../ticket.css']
})


export class TicketDetailsComponent implements OnInit {

  mticketID: string;
  objTicket: ticket;
  panelOpenState = false;

  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog) { }

  ngOnInit() {
    let ID = this.route.snapshot.params['ID'];
    this.mticketID = ID;
    this.ticketService.getTicket(this.mticketID)
      .subscribe(
        res => {
          this.objTicket = res as ticket;
          console.log(this.objTicket);
        }
      );
  }

  BackToList() {
    this.router.navigate(['/default']);
    // per tornare alla home l'ID del ticket corrente (ed eventualmetne evidenziarlo)
    //let selectID = this.ticket.ID ? this.ticket.ID:null;
    //this.router.navigate(['/home', {id:selectID}]);
  }
  BackToCalendar() {
    this.router.navigate(['/calendar']);
  }

  Confirm() {
    const dialogRef = this.dialog.open(DialogConferma, {
      width: '250px',
    });
  }

  Print() {
    //this.router.navigate(['/default']);
    this.ShowMessage("Funzione non abilitata", "Esticazzi", true);
  }

  // dragMoved(event: CdkDragMove) {
  //   this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  //   //console.log (this.position);
  // }

  ShowMessage(msg: string, title?: string, hasErrors: boolean = false) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;

    if (hasErrors) {
      config.panelClass = ['error-class'];
      console.log("ShowMessage: hasErrors");
    }
    //else
    //  config.panelClass =  ['ng-deep'];

    if (title != null)
      this.snackBar.open(msg, title, config);
    else
      this.snackBar.open(msg, null, config);
  }


  //*****************DragnDrop: Per attivarlo inserire cdkDrag LO SNAP NON FUNZIONA MOLTO BENE***************************/
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
      console.log("swap a dx => perchè xDetail= " + xDetail + " > xDetailist= " + xDetailList);
      this.tr3dDetail = wDetailList;
      this.tr3dDetailList = - wDetail;
    } else {
      console.log("swap a sx <= perchè xDetail= " + xDetail + " < xDetailist= " + xDetailList);
      this.tr3dDetail = 0;
      this.tr3dDetailList = 0;
    }
  }

  ticketClassTipo(){
    return  {
      'ticket-tipoA': this.objTicket.tipoTicket=="A",
      'ticket-tipoI': this.objTicket.tipoTicket=="I",
      'ticket-tipo': true
    }
  }


}


/* Dialog Component */
@Component({
  templateUrl: 'dialog-conferma.html',
})

export class DialogConferma {

  constructor(public dialogRef: MatDialogRef<DialogConferma>) { }

  onNoClick(): void {
    //click fuori dalla dialog chiude la dialog
    this.dialogRef.close();
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

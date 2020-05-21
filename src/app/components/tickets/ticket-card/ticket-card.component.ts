import { Component, OnInit,Input, Output} from '@angular/core';

import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  QueryList, TemplateRef,
  ViewChild
} from '@angular/core';

import { TicketService } from 'src/app/services/ticket.service';
import{ ticket } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit, AfterViewInit, AfterContentInit {

  localTicket : ticket;

  @Input()            
    ticket : ticket;
  
  @Input()
    ticketIndex: number;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
  }
  ngAfterContentInit() {
  }
  
  onOpenTicketClick(){
    console.log("ticket component - clicked " );
    //console.log(this.ticket);

    //console.log(this.ticket);


  }
  ticketClasses(){
    return  {
      'stato70': this.ticket.statoTicket=="70",
      'stato80': this.ticket.statoTicket=="80",
      'stato90': this.ticket.statoTicket=="90",
      'ticket-card': true
    }
}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';            //fullcalendar
import timeGridPlugin from '@fullcalendar/timegrid';          //fullcalendar
import listWeekPlugin from '@fullcalendar/list';             //fullcalendar
import interactionPlugin from '@fullcalendar/interaction';    //fullcalendar
//import it from '@fullcalendar/core/locales/it';             //sarebbe per la lingua ma sembra funzionare anche senza
import { environment } from 'src/environments/environment';   //serve per importare variabili ambiente di fullcalendar
import { FullCalendarComponent } from '@fullcalendar/angular';

import { Observable, BehaviorSubject } from 'rxjs';

import { ticketEvent, ticket } from 'src/app/models/models';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  //estraggo un po' di variabili da assegnare all'oggetto fullcalendar
  header = environment.fullcalendarConfig.header;
  navlinks = environment.fullcalendarConfig.navlinks;
  lang = environment.fullcalendarConfig.lang;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listWeekPlugin, interactionPlugin];
  calendarWeekends = environment.fullcalendarConfig.calendarWeekends;
  buttonText = environment.fullcalendarConfig.buttonText;
  defaultAllDayEventDuration = environment.fullcalendarConfig.defaultAllDayEventDuration;
  nowIndicator = environment.fullcalendarConfig.nowIndicator;
  forceEventDuration = environment.fullcalendarConfig.forceEventDuration;
  weekLabel = environment.fullcalendarConfig.weekLabel;

  //ecco un evento
  // impostaData1 = new Date('Wed Jun 02 2020 00:01:00 GMT+0100');
  // impostaData2 = new Date('Wed Jun 02 2020 00:02:00 GMT+0100');
  // calendarEvents =
  //   [
  //     {
  //       allDay: true,
  //       color: '#00bb99',
  //       date: '2020-06-02',
  //       end: this.impostaData2,
  //       id: "1",
  //       start: this.impostaData1,
  //       textColor: "#fff",
  //       title: 'qui devono vedersi i ticket'
  //     },
  //   ];

  screenHeight: number;
  screenWidth: number;


  @ViewChild('DOMcalendario') calendario: FullCalendarComponent;

  //@HostListener('window:resize', ['$event']) //non sembra funzionare

  //allEvents$: Observable<ticketDetail[]>;

  constructor(private tService: TicketService, private router: Router) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

  }

  tickets;
  ticketEvents: ticketEvent[];

  ngOnInit() {

    this.tService.getTicketList()
      .subscribe(
        res => {
          this.tickets = res as ticket[];
          this.LoadCalendar();
        }
      );
  }

  LoadCalendar() {
    this.ticketEvents = [];
    this.tickets.forEach(element => {
      //AS: modificando il model ticketEvent da interface a class FUNZIONA!
      let _event: ticketEvent = new ticketEvent();

      _event.title = element.tipoTicket + '-' + element.n_Ticket + "-" + element.customer.ragsoc;
      _event.id = element.id;
      _event.allDay = true;
      _event.start = element.data1;
      _event.end = element.data1;
      //_event.start =  new Date('2020-06-17T08:00:00');
      //_event.end =  new Date('2020-06-17T09:00:00');
      if (element.tipoTicket == "A")
        _event.color = '#3cb3f7';
      else {
        _event.color = '#ff7843';
      }
      _event.textColor = "#fff";
      this.ticketEvents.push(_event as ticketEvent);
    });
  }

  //passo al calendario alcune opzioni "dinamiche"
  //nello stesso modo potevo passargli anche quelle di base
  ngAfterViewInit() {
    const api = this.calendario.getApi();
    api.setOption('height', (this.screenHeight - 90));
    api.setOption('themeSystem', 'bootstrap');          //non so a cosa serva
    if (this.screenWidth > 1000) { api.setOption('weekNumbers', true) } else { api.setOption('weekNumbers', false) }

    api.render();

  }

  clickEvent(event){
    console.log(event.event.id);
    this.router.navigate(['/ticket-details', event.event.id]);
  }

  /*
  onCalendarInit(e:boolean) {
       if(e) {
      this.events$.subscribe((events) => {
        this.calendario.fullCalendar('removeEvents');
        this.calendario.fullCalendar('addEventSource', events);
      });
    }
  }*/



}




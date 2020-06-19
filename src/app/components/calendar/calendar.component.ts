import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';            //fullcalendar
import timeGridPlugin from '@fullcalendar/timegrid';          //fullcalendar
import listWeekPlugin  from '@fullcalendar/list';             //fullcalendar
import interactionPlugin from '@fullcalendar/interaction';    //fullcalendar
//import it from '@fullcalendar/core/locales/it';             //sarebbe per la lingua ma sembra funzionare anche senza
import { environment } from 'src/environments/environment';   //serve per importare variabili ambiente di fullcalendar
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { ticketDetail, ticket } from 'src/app/models/models';
import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { TicketService } from 'src/app/services/ticket.service';

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
  impostaData1 = new Date('Wed Jun 02 2020 00:01:00 GMT+0100');
  impostaData2 = new Date('Wed Jun 02 2020 00:02:00 GMT+0100');
  impostaData3 = new Date('2020-06-17T08:00:00');
  impostaData4 = new Date('2020-06-18T18:00:00');
  impostaData5 = new Date('Wed Jun 29 2020 00:01:00 GMT+0100');
  impostaData6 = new Date('Wed Jun 29 2020 00:02:00 GMT+0100');
  calendarEvents= 
  [
      {
        allDay: true,
        color: '#00bb99',
        date: '2020-06-02',
        end: this.impostaData2,
        id: "1",
        start: this.impostaData1,
        textColor: "#fff",
        title: 'qui devono vedersi i ticket'
      },
      {
        allDay: false,
        color: '#ffcc00',
        date: '2020-06-17',
        end: this.impostaData4,
        id: "1",
        start: this.impostaData3,
        textColor: "#555",
        title: 'in vari colori e draggabili'
      },
      {
        allDay: true,
        color: '#ff5500',
        date: '2020-06-29',
        end: this.impostaData5,
        id: "1",
        start: this.impostaData6,
        textColor: "#fff",
        title: 'anche editabili? se sì serve modalform'
      },
  ];

  screenHeight: number;
  screenWidth: number;


  @ViewChild('calendar') calendario: FullCalendarComponent;
  //@HostListener('window:resize', ['$event']) //non sembra funzionare

  allEvents$: Observable<ticketDetail[]>;
  
  //_events = new BehaviorSubject<ticket[]>(EVENTS);
  //events$ = this._events.asObservable();

  constructor(private eventsService: TicketService) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
   }

   ngOnInit() {
  }
  onCalendarInit(e:boolean) {
   /*
    if(e) {
      this.events$.subscribe((events) => {
        this.calendario.fullCalendar('removeEvents');
        this.calendario.fullCalendar('addEventSource', events);
      });
    }
    */
  }


   
  //passo al calendario alcune opzioni "dinamiche"
  //nello stesso modo potevo passargli anche quelle di base
  ngAfterViewInit(){
    const api = this.calendario.getApi();
    api.setOption('height', (this.screenHeight - 90));
    api.setOption('themeSystem', 'bootstrap');          //non so a cosa serva
    if (this.screenWidth > 1000 ) {api.setOption('weekNumbers', true)} else {api.setOption('weekNumbers', false)}
    api.render();
  }



  
  

}




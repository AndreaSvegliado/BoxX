import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() pagina: string;



  tickets;
  ticketEvents: ticketEvent[];

  screenHeight: number;
  screenWidth: number;


  @ViewChild('DOMcalendario') calendario: FullCalendarComponent;

  //@HostListener('window:resize', ['$event']) //non sembra funzionare

  constructor(private router : Router, private tService: TicketService, private route: ActivatedRoute,) {
    this.screenHeight = window.innerHeight;        //AS: ????
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    
    if (this.pagina == 'home') {
      this.header = environment.fullcalendarConfig.header_home;
      this.defaultView = environment.fullcalendarConfig.defaultView_home;
    }


    this.tService.getTicketList()
    .subscribe(
      res=>  {
        this.tickets = res as ticket[];
        this.LoadCalendar();
      }
    );

    
  }

  ngAfterViewInit() {
    this.InitCalendar();
  }

  //variabili da assegnare all'oggetto fullcalendar lato html
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
  defaultView = environment.fullcalendarConfig.defaultView;

  InitCalendar(){
    

    const api = this.calendario.getApi();
    api.setOption('themeSystem', 'bootstrap');          //non so a cosa serva

    if (this.pagina != 'home') 
      api.setOption('height', (this.screenHeight - 90));
    else 
      api.setOption('height', 450);
    
    if ((this.screenWidth > 1000) && (this.pagina != 'home')) 
       api.setOption('weekNumbers', true) 
    else 
      api.setOption('weekNumbers', false) 
    
    api.render();

    let dateToGo = this.route.snapshot.params['dateToGo'];
    if (dateToGo) {
      api.gotoDate (dateToGo);
    }
  }

  LoadCalendar(){
    this.ticketEvents = [];

    this.tickets.forEach (element => {
      //AS: modificando il model ticketEvent da interface a class FUNZIONA!
      let _event: ticketEvent  = new ticketEvent();

      _event.title = element.n_Ticket + " - " + element.customer.ragsoc;
      _event.id = element.id;
      _event.allDay = true;
      _event.start =  element.data1;
      if(element.data2 != null)
        _event.end =  element.data2;
      else
        _event.end =  element.data1;

      _event.color = '#00bb99';
      _event.textColor = "#fff";

      this.ticketEvents.push(_event as ticketEvent);
    });
  }

  calendarEventClick(model) {
    this.router.navigate(['/ticket-details', model.event.id]);
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




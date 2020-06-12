import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';            //fullcalendar
import timeGridPlugin from '@fullcalendar/timegrid';          //fullcalendar
import listWeekPlugin  from '@fullcalendar/list';             //fullcalendar
import interactionPlugin from '@fullcalendar/interaction';    //fullcalendar
//import it from '@fullcalendar/core/locales/it';             //sarebbe per la lingua ma sembra funzionare anche senza
import { environment } from 'src/environments/environment';   //serve per importare variabili ambiente di fullcalendar
import { FullCalendarComponent } from '@fullcalendar/angular';

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
  calendarEvents= 
    [
      {
        allDay: true,
        color: '#7fff64',
        date: '2020-06-02',
        end: this.impostaData2,
        id: "1",
        start: this.impostaData1,
        textColor: "#000",
        title: 'Dentista'
      },
  ];

  screenHeight: number;
  screenWidth: number;


  @ViewChild('calendar') calendario: FullCalendarComponent;
  //@HostListener('window:resize', ['$event']) //non sembra funzionare
  constructor() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
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



  ngOnInit(): void {
  }

  

}

import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import it from '@fullcalendar/core/locales/it'; 

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  it = it;
  constructor() { }

  ngOnInit(): void {
  }

  calendarPlugins = [dayGridPlugin]; // important!

}

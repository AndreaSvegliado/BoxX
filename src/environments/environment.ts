// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiBaseUrl: "http://188.152.211.199/iQWApi/api",

  fullcalendarConfig : {
    lang: 'it',
    buttonText : {
        today:    'oggi',
        month:    'mese',
        week:     'settimana',
        day:      'giorno',
        list:     'lista'
    },
    navlinks: true,
    calendarWeekends: false,
    header : {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    header_home : {
      left: '',
      center: 'title',
      right: ''
    },
    defaultAllDayEventDuration : {
    days: 1
    },
    forceEventDuration: true,
    nowIndicator : true,
    weekLabel: '',
    defaultView: 'dayGridMonth',
    defaultView_home : 'listWeek'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.



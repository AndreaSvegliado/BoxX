import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { DefaultComponent} from './layouts/default/default.component';

import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketCardComponent } from './components/tickets/ticket-card/ticket-card.component';
import { TicketDetailsComponent } from './components/tickets/ticket-details/ticket-details.component';
import { TicketHistoryComponent } from './components/tickets/ticket-history/ticket-history.component';

import { CalendarComponent } from './components/calendar/calendar.component';
import { TodoEventsListComponent } from './components/todoevents/todoevents-list/todoevents-list.component';


const routes: Routes = [

  { path:'default', component: DefaultComponent, canActivate:[AuthGuard]  },
  //{ path:'home', component: DefaultComponent, canActivate:[AuthGuard]  },

  { path:'userDetails', component: UserDetailsComponent, canActivate:[AuthGuard]  },

  { path:'ticket-card', component: TicketCardComponent, canActivate:[AuthGuard]  },
  { path:'ticket-details/:ID', component: TicketDetailsComponent, canActivate:[AuthGuard]},
  { path:'ticket-list', component: TicketListComponent, canActivate:[AuthGuard]},
  { path:'ticket-history', component: TicketHistoryComponent, canActivate:[AuthGuard]},

  { path:'calendar', component: CalendarComponent, canActivate:[AuthGuard]  },
  { path:'calendar/:dateToGo', component: CalendarComponent, canActivate:[AuthGuard]  },
  { path:'todoevents-list', component: TodoEventsListComponent, canActivate:[AuthGuard]},

  //...
  //{path: '**', component: PageNotFoundComponent}


  { path:'' , redirectTo: 'user/login', pathMatch: 'full' },
  { path:'user', component: UserComponent,
    children:[
    {path:'registration', component: RegistrationComponent },
    {path:'login', component: LoginComponent }
    ]
  },

  /*
  {
  path: '',
  component: DefaultComponent

  children:[
    { path: '', component: DashboardComponent },
    { path: 'posts', component: PostsComponent }
    ]
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

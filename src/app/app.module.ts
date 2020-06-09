import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule} from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';            //AS: reference per chiamata a WS
import { HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component'
import { LoginComponent } from './user/login/login.component';
import { UserService } from './services/user.service';

import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TicketCardComponent } from './components/tickets/ticket-card/ticket-card.component';
import { TicketDetailsComponent } from './components/tickets/ticket-details/ticket-details.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';            //AS: reference per gestione token JWT
import { TicketDetailListComponent } from './components/tickets/ticket-detail-list/ticket-detail-list.component';
import { MatNativeDateModule, MatInputModule} from '@angular/material';


import {  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SidebarComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    UserDetailsComponent,
    
    TicketCardComponent,
    TicketDetailsComponent,
    TicketDetailComponent,
    TicketDetailListComponent,
    
    SnackbarComponent,
    
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,           //AS: reference per chiamata a WS
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule,    //AS: TimePicker
    NgxMaterialTimepickerModule.setLocale('it-IT'), NgbModule,
    DragDropModule
  ],
  exports:[
    //NgbdDatepickerAdapter,
  ],
  //providers: [],
  //AS: Injection per fare comunicare tra loro moduli diversi
    providers:[UserService,  { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { 
      provide: MAT_DATE_LOCALE, useValue: 'it-IT' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

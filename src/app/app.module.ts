import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MaterialModule} from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//AS
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component'
import { LoginComponent } from './user/login/login.component';
import { UserService } from './shared/user.service';

import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';            //AS: reference per chiamata a WS
import { HTTP_INTERCEPTORS} from '@angular/common/http';            //AS: reference per gestione token JWT

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,           //AS: reference per chiamata a WS
    FormsModule,
    ReactiveFormsModule
  ],
  //providers: [],
  //AS: Injection per fare comunicare tra loro moduli diversi
  //providers: [],
    providers:[UserService,  { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

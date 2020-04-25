import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent} from './layouts/default/default.component';

import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  
  
  
  { path:'home', component: DefaultComponent, canActivate:[AuthGuard]  },
  //...
  
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

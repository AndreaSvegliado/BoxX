import { Injectable } from '@angular/core';
import { CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
//export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private uService: UserService ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {

      //console.log("DEBUG: auth.guard");
      if(localStorage.getItem('token') != null){
        //console.log ("Auth.guard/canActivate: True");

        this.uService.changeLoggedIn(true);
        return true;
      }
      else{
        //Not logged: redirect to Login
        this.router.navigate(['user/login']);
        this.uService.changeLoggedIn(false);
        return false;
      }
  }
  /*
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  */
}

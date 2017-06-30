import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable()
export class AuthLogGuard implements CanActivate{
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService ){

  }

  canActivate(){
    if(!this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      this.flashMessage.show('You are already Logged in!', {
        cssClass:'alert-warning',
        timeout: 3000
      });
      return false;
    }
  }


}

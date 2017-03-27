import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class SessionService {

    private loggedIn: boolean = false;
    private user    : User;


    set userReturn(user:User){
      this.user=user;
    }

    get userReturn():User{
      return this.user;
    }
    get loggedInReturn():boolean{
        return this.loggedIn;
    }
    set loggedInReturn(isLoggedIn: boolean){
        this.loggedIn = isLoggedIn;
    }
}

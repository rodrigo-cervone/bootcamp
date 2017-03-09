import { NgModule, ErrorHandler } from '@angular/core';
import { Logger, Options, Level } from "angular2-logger/core";
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GithubUsers } from '../services/github-users.services';
import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserLoginPage } from '../pages/user-login/user-login';

@NgModule({
  declarations: [
    MyApp,
    UsersPage,
    ReposPage,
    UserDetailsPage,
    UserLoginPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsersPage,
    ReposPage,
    UserDetailsPage,
    UserLoginPage,
  ],
  providers: [
    { provide: Options, useValue: { level: Level.DEBUG } },
    Logger,
    GithubUsers,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}

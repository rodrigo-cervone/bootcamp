import { NgModule, ErrorHandler } from '@angular/core';
import { Logger, Options, Level } from "angular2-logger/core";
import { Storage } from '@ionic/storage';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

/* Services */
import { GithubUsers } from '../services/github-users.services';

/* Pages */
import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserLoginPage } from '../pages/user-login/user-login';
import { PerformanceGSAPPage } from '../pages/performance-gsap/performance-gsap';

export function provideStorage() {
  return new Storage( ['sqlite', 'websql', 'indexeddb'], { name: '__bootcampdb' } );
}

@NgModule({
  declarations: [
    MyApp,
    UsersPage,
    ReposPage,
    UserDetailsPage,
    UserLoginPage,
    PerformanceGSAPPage
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
    PerformanceGSAPPage
  ],
  providers: [
    { provide: Options, useValue: { level: Level.DEBUG } },
    { provide: Storage, useFactory: provideStorage },
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    Logger,
    GithubUsers
  ]
})
export class AppModule {
  constructor() { }
}

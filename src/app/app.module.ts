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
import { I18nModule } from '../i18n/i18n.module';
import { 
  I18nService, 
  LANGS, 
} from '../i18n/i18n.service';
import { AnimationPage } from '../pages/animation/animation';
import { MockBootcampBackendModule } from '../mock-bootcamp-backend/mock-bootcamp-backend.module';

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
    AnimationPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    I18nModule,
    MockBootcampBackendModule
  ],
  entryComponents: [
    MyApp,
    UsersPage,
    ReposPage,
    UserDetailsPage,
    UserLoginPage,
    AnimationPage,
  ],
  providers: [
    { provide: Options, useValue: { level: Level.DEBUG } },
    { provide: Storage, useFactory: provideStorage },
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    Logger,
    GithubUsers,
    I18nService
  ],
  bootstrap: [IonicApp]
})
export class AppModule {
  constructor(i18nService:I18nService) {
    i18nService.use(LANGS.EN);
  }
}

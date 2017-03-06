import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';

import { MyApp } from './app.component';
import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { UserLoginPage } from '../pages/user-login/user-login';

import { GithubUsers } from '../providers/github-users.providers';

import {
  GithubUsersStub,
  LoggerStub
} from '../stubs';

import { UserDetailsPage } from '../pages/user-details/user-details';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [ MyApp ],

            providers: [
              { provide: GithubUsers, useClass: GithubUsersStub },
              { provide: Logger, useClass: LoggerStub }
            ],

            imports: [
                IonicModule.forRoot(MyApp)
            ]

        })
        .overrideComponent(MyApp, {
          set: {
            providers: [

            ]
          }
        })
        .compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {

        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();

    });

    it('initialises with a root page of HomePage', () => {
        expect(comp['rootPage']).toBe(UserLoginPage);
    });

});

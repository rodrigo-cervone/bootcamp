import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';

import { MyApp } from './app.component';
import { UserLoginPage } from '../pages/user-login/user-login';

import { GithubUsers } from '../services/github-users.services';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({

          declarations: [ MyApp ],

          providers: [
            { provide: GithubUsers, useValue: {} },
            { provide: Logger, useValue: {} }
          ],

          imports: [
              IonicModule.forRoot(MyApp)
          ]

      })
      .compileComponents();

    });

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

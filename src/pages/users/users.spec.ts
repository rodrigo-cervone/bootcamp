import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { GithubUsers } from '../../services/github-users.services';

import { UsersPage } from './users';


class GithubUsersMock {
  load() {
    let u: Array<any> = [{
      errorCode: 0,
      userId: 1,
      userToken: "token",
      login: "login"
    }]
    return Observable.of(u);
  }
}

describe('User Component Page', () => {

  let comp:    UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(UsersPage)
      ],
      declarations: [
        UsersPage
      ], // declare the test component
      providers: [
        {provide: Logger, useValue: { debug: () => {}, info: () => {}}},
        {provide: NavController, useValue: {}},
        {provide: GithubUsers, useClass: GithubUsersMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    comp = fixture.componentInstance;

  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });
});

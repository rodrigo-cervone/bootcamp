import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { NavController } from 'ionic-angular';

import { GithubUsers } from '../../providers/github-users.providers';

import {
  GithubUsersStub,
  StorageStub,
  LoggerStub,
  NavControllerStub
} from '../../stubs';

import { UsersPage } from './users';

describe('User Component Page', () => {

  let comp:    UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(UsersPage)
      ],
      declarations: [
        UsersPage
      ], // declare the test component
      providers: [
        {provide: Logger, useClass: LoggerStub},
        {provide: NavController, useClass: NavControllerStub},
        {provide: GithubUsers, useClass: GithubUsersStub}
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

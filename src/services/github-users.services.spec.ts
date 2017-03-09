import { TestBed, inject, async } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Storage } from '@ionic/storage';
import { Logger } from 'angular2-logger/core';
import { Events } from 'ionic-angular';

import { GithubUsers, SigninInfo } from './github-users.services';

describe('Github Users Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubUsers,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: Storage,
          useValue: {
            get: (key:string) => {
              let p: Promise<any> = new Promise((res, rej) => {
                res({});
              });

              return p;
            }
          }
        },
        { provide: Events, useValue: {}},
        {
          provide: Logger,
          useFactory: () => { return { debug: () => {}, info: () => {}} }
        }
      ]
    })
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    let response = JSON.stringify({
      errorCode: 0,
      userId: 1,
      avatar_url: "sleepy",
      login: "zzz@zzz.tld"
    });

    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('Should load details of the user.', async(inject([GithubUsers], (backend:GithubUsers) => {
    backend.loadDetails('zzz@zzz.tld').subscribe(u => {
      expect(u.avatar_url).toBe("sleepy");
    });
  })));
});

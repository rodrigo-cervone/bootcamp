import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { ConnectionBackend, RequestOptions} from '@angular/http';
import { MockGithubBackendService } from './mock-github-backend.service';
import { Logger, Options, Level } from "angular2-logger/core";


// @TODO 
// Bind in-memory-web-api to this module.
// Implement another service and see how it behaves.
@NgModule({
  declarations: [],
  providers: [
    { provide: Options, useValue: { level: Level.DEBUG } },
    Logger,
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: (backend:ConnectionBackend, options:RequestOptions) => { 
        return new Http(backend, options); 
      }
    },
    MockGithubBackendService
  ]
})
export class MockBootcampBackendModule {
  constructor(
    private fakeGithubBackend: MockGithubBackendService, 
    private logger: Logger,
    private http: Http
  ) {
    this.logger.warn("Fake backend is active.");
    this.logger.warn("Remember to remove this when the real backend is ready.");
  }
}
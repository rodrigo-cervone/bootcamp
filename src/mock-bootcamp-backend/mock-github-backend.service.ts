import {Injectable} from '@angular/core';
import { 
    Response, 
    ResponseOptions, 
    BaseRequestOptions, 
    XHRBackend,
    RequestOptions,
    // RequestMethod,
    Http
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { Logger } from "angular2-logger/core";
import users from './github/users';
import repos from './github/repos';

var db = {
    users,
    repos
};

// @TODO We currently can't fake the login because we are using an external module for that 
// and it does not honour the http module of angular.
@Injectable()
export class MockGithubBackendService {
    constructor(
        private backend: MockBackend, 
        private options: BaseRequestOptions, 
        private realBackend: XHRBackend,
        private logger: Logger
    ) {
        this.backend.connections.subscribe( (c:MockConnection):any => {
            let baseUrl = /api\.github\.com/;
            
            // If its not part of the API that we are mocking
            // just pass through http.
            if (!baseUrl.test(c.request.url)) {
                return this.passThrough(c);
            }

            if(c.request.url.endsWith('users')) {
                this.logger.debug("Mocking /users endpoint");
                c.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(db.users) })));
                return;
            };
            
            if(c.request.url.match(/users\/[a-zA-Z0-9_]+$/)) {
                this.logger.debug("Mocking /users/[a-zA-Z0-9_] endpoint");
                c.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(db.users[0]) })));
                return;
            };

            if(c.request.url.match(/users\/[a-zA-Z0-9_]+\/repos$/)) {
                this.logger.debug("Mocking /users/[a-zA-Z0-9_]/repos endpoint");
                c.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(db.repos) })));
                return;
            };


            this.passThrough(c);
        });
    }

    private passThrough(connection: MockConnection) {
        this.logger.debug("Passing through http");
        let realHttp = new Http(this.realBackend, this.options);
        let requestOptions = new RequestOptions({
            method: connection.request.method,
            headers: connection.request.headers,
            body: connection.request.getBody(),
            url: connection.request.url,
            withCredentials: connection.request.withCredentials,
            responseType: connection.request.responseType
        });
        realHttp.request(connection.request.url, requestOptions)
            .subscribe((response: Response) => {
                connection.mockRespond(response);
            },
            (error: any) => {
                connection.mockError(error);
            });
    }

}
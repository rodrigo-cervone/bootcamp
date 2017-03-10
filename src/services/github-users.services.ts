import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Rx';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';
import { Repo } from '../models/repo.model';

import github from 'octonode';

export interface SigninInfo {
  errorCode: Number,
  userId: Number,
  userToken: string,
  login: string
}

export const ERR_SIGNIN_BAD_CREDENTIALS = 1;
export const ERR_SIGNIN_UNKNOWN = 100;

@Injectable()
export class GithubUsers {

  private readonly githubApiUrl = 'https://api.github.com';
  private signinInfo: SigninInfo = {
    errorCode: 0,
    userId: -1,
    userToken: "",
    login: ""
  };
  private ghClient: any;

  constructor(
    private http: Http,
    private storage: Storage,
    private events: Events,
    private logger: Logger
  ) {
    this.logger.debug("GithubUsers Service");

    this.storage.get('signinInfo').then((signinInfo) => {
      if(signinInfo && signinInfo.userId > 0) {
        this.logger.debug("User is signed in. Fetch the user from the local storage");
        this.signinInfo = signinInfo;
        this.events.publish('user::loggedin', this.signinInfo);
      }
    });
  }

  isSignedIn(): boolean {
    return !!(this.signinInfo.userId > 0);
  }

  getSignedInUser(): string {
    return this.signinInfo.login;
  }

  login(username: string, password: string): Observable<SigninInfo> {

      let p: Promise<SigninInfo> = new Promise((resolve, reject) => {

      let scopes = {
        add_scopes: ['user', 'repo', 'gist'],
        // I know... but for learning purposes it's ok.
        note: `hub::fetch-access-token::${Math.random() * 10000}`
      };

      if (this.isSignedIn()) {
        // Get a client from an access token and save it for further use.
        return resolve(this.signinInfo);
      }

      github.auth
      .config({
        username: username,
        password: password
      })
      .login(scopes, (err: any, id: number, token:string) => {
        if (err != null) {
          if (err.message === "Bad credentials") {
            this.signinInfo.errorCode = ERR_SIGNIN_BAD_CREDENTIALS;
          } else {
            this.signinInfo.errorCode = ERR_SIGNIN_UNKNOWN;
          }
          return reject(this.signinInfo);
        }

        this.signinInfo.userId = id;
        this.signinInfo.userToken = token;
        this.signinInfo.errorCode = 0;
        // Get a client from an access token and save it for further use.
        this.ghClient = github.client(this.signinInfo.userToken);
        // We could use this to show the last successfull login in the app...
        // but... meh.
        this.signinInfo.login = "";
        this.signinInfo.login = username;
        this.storage.ready().then(() => {
          this.storage.set('signinInfo', this.signinInfo);
        });

        resolve(this.signinInfo);
      });
    });
    return Observable.fromPromise(p);
  }

  logout() {
    this.signinInfo.userId = -1;
    this.signinInfo.userToken = "";
    this.signinInfo.errorCode = 0;
    this.storage.ready().then(() => {
      this.storage.set('signinInfo', this.signinInfo);
    });
    this.ghClient = null;
  }

  load(): Observable<User[]> {
      return this.http.get(`${this.githubApiUrl}/users`)
        .map(res => <User[]>res.json());
  }

  // Get github user by providing login(username)
  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }

  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`)
      .map(res => <User[]>(res.json().items))
  }

  fetchUserRepos(login: string): Observable<Repo[]> {
    return this.loadDetails(login)
      .flatMap((user: User) => {
        return this.http.get(user.repos_url).map(res => <Repo[]> res.json());
      });
  }
}

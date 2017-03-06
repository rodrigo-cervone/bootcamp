import { Observable } from 'rxjs/Rx';
// import { User } from '../models/user.model';
import { Repo } from '../models/repo.model';

export class GithubUsersStub {
  public isSignedIn(): boolean {
    return true;
  }

  public login(): boolean {
    return true;
  }

  public logout(): boolean {
    return true;
  }

  public load(): Observable<any[]> {
    let u = [{
      errorCode: 0,
      userId: 1,
      userToken: "token",
      login: "login"
    }]
    return Observable.of(u);
  }

  public loadDetails(): boolean {
    return true;
  }

  public searchUsers(): boolean {
    return true;
  }

  public fetchUserRepos(): boolean {
    return true;
  }
}

export class StorageStub {
  set(key:string, value: any) {};

  get(key:string){
    return {};
  }
}

export class LoggerStub {
  debug(value:any) {};
  info(value:any) {};
  warn(value:any) {};
  error(value:any) {};
}

export class NavControllerStub {
  setRoot(comp: any, params?: any) {
    return true;
  }
}

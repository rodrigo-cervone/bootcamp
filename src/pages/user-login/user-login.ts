import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import {
  GithubUsers,
  SigninInfo,
  ERR_SIGNIN_BAD_CREDENTIALS
} from '../../providers/github-users.providers';
import { UserDetailsPage } from '../user-details/user-details';

/*
  Generated class for the UserLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html'
})

export class UserLoginPage {

  private userInfo: SigninInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsers: GithubUsers,
    private logger: Logger
  ) {}

  ionViewDidLoad() {
    this.logger.debug('ionViewDidLoad UserLoginPage');
  }

  login(username: string, password: string) {
    this.githubUsers
      .login(username, password)
      .subscribe((userInfo: SigninInfo) => {
        this.logger.debug('Authentication was ok.');
        this.userInfo = userInfo;
        this.navCtrl.setRoot(UserDetailsPage, {login: this.userInfo.login});
      }, (userInfo: SigninInfo) => {
        if (userInfo.errorCode === ERR_SIGNIN_BAD_CREDENTIALS) {
          return this.logger.debug("Show bad credentials message");
        }
        return this.logger.error(userInfo.errorCode);
      });
  }
}

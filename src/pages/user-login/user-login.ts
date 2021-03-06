import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';


import {
  GithubUsers,
  SigninInfo,
  ERR_SIGNIN_BAD_CREDENTIALS
} from '../../services/github-users.services';
import { UserDetailsPage } from '../user-details/user-details';
import { SessionService } from '../../services/session.service';
import { User } from '../../models/user.model';
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
    private logger: Logger,
    private alertCtrl: AlertController,
    public sessionService : SessionService
  ) {
    //Nothing
  }

  ionViewDidLoad() {
    this.logger.debug('ionViewDidLoad UserLoginPage');
  }

  login(username: string, password: string) {
    this.githubUsers
      .login(username, password)
      .subscribe((userInfo: SigninInfo) => {
        this.logger.debug('Authentication was ok.');
        this.userInfo = userInfo;

        //Getting user info and save on a service
        this.githubUsers
          .loadDetails(this.userInfo.login)
            .subscribe((user: User) => {
                this.sessionService.userReturn = user;
                this.sessionService.loggedInReturn = true;
                this.navCtrl.setRoot(UserDetailsPage, {login: this.userInfo.login});
              });

      }, (userInfo: SigninInfo) => {
        if (userInfo.errorCode === ERR_SIGNIN_BAD_CREDENTIALS) {
          this.showAlert("Error ","Bad credentials")
        }
        return this.logger.error(userInfo.errorCode);
      });
  }

  /**
  * @TODO Method to show alert
  * @name showAlert
  * @param  {string} title
  * @param  {string} subTitle
  */
  showAlert(title: string,subTitle: string) {
    let alert = this.alertCtrl.create({
                  title     : title,
                  subTitle  : subTitle,
                  buttons   : ['Ok']
                  });
   alert.present();
  }//End

}

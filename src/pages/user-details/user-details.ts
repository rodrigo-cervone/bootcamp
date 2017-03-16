import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { User } from '../../models/user.model';
import { GithubUsers } from '../../services/github-users.services';
import { SessionService } from '../../services/session.service';
import { ReposPage } from '../repos/repos';

/*
  Generated class for the UserDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {

  private user: User;
  private login: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsers: GithubUsers,
    private logger: Logger,
    private sessionService : SessionService
  ) {
    this.login = navParams.get('login');
    this.user=this.sessionService.userReturn;
  }

  ionViewDidLoad() {
      //Nothing
  }

  goToRepos(login: string) {
    this.navCtrl.push(ReposPage, {login});
  }
}

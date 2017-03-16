import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { UserEntity } from '../../models/user.model';
import { GithubUsers } from '../../services/github-users.services';
import { SessionService } from '../../services/session.service';

/*
  Generated class for the UserEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html'
})
export class UserEditPage {
  private user: UserEntity;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsers: GithubUsers,
    private logger: Logger,
    public sessionService: SessionService

  ) {
    this.user = this.sessionService.userReturn;

  }

  ionViewDidLoad() {
    // Nothing
  }
  /**
  * Method to send th entity User to API of GitHub
  * @Method
  * @name send|
  * @author {} Jaime Hernández
  */
  send(){
    //Send to update the register
  }

}

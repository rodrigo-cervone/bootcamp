import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';

import { GithubUsers } from '../../providers/github-users.providers';
import { User } from '../../models/user.model';
import { UserDetailsPage } from '../user-details/user-details';
/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  private users: User[]
  private originalUsers: User[];

  constructor(
    public navCtrl: NavController,
    private githubUsers: GithubUsers,
    private logger: Logger
  ) {
    githubUsers.load().subscribe((users: User[]) => {
      this.logger.info('Fetched users from github', users);
      this.users = users;
      this.originalUsers = users;
    });
  }

  ionViewDidLoad() {
    this.logger.debug('ionViewDidLoad UsersPage');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(term: string) {
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users
      });
    }
  }
}

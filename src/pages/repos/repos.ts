import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';

import { Repo } from '../../models/repo.model';

import { GithubUsers } from '../../providers/github-users.providers';
/*
  Generated class for the Repos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-repos',
  templateUrl: 'repos.html'
})
export class ReposPage {
  private login: string;
  private repos: Repo[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsers: GithubUsers,
    private logger: Logger
  ) {
    this.login = navParams.get('login');
  }

  ionViewDidLoad() {
    this.logger.debug('ionViewDidLoad ReposPage');
    let login: string = this.login || this.githubUsers.getSignedInUser()
    this.githubUsers.fetchUserRepos(login).subscribe((repos: Repo[]) => {
      this.logger.debug("Repos: ", repos);
      this.repos = repos;
    });
  }

}

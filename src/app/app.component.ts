import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';
import { Events } from 'ionic-angular';

import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { UserLoginPage } from '../pages/user-login/user-login';
import { GithubUsers } from '../providers/github-users.providers';
import { UserDetailsPage } from '../pages/user-details/user-details';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = UserLoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private events: Events,
    private githubUsers: GithubUsers
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Users', component: UsersPage },
      { title: 'Repos', component: ReposPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.events.subscribe('user::loggedin', ({login}) => {
        this.nav.setRoot(UserDetailsPage, {login: login});
      });
    });
  }

  logout() {
    this.menu.close();
    this.githubUsers.logout();
    this.nav.setRoot(UserLoginPage);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { User } from '../../models/user.model';
import { GithubUsers } from '../../services/github-users.services';
import { ReposPage } from '../repos/repos';
import { 
  LANGS,
  I18nService
} from '../../i18n/i18n.service';

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
  private currentLanguage:string;
  private isSpanish:boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsers: GithubUsers,
    private i18nService: I18nService,
    private logger: Logger
  ) {
    this.login = navParams.get('login');
    this.githubUsers.loadDetails(this.login).subscribe((user: User) => {
      this.user = user;
      this.logger.debug("User: ", this.user);
    });
    this.currentLanguage = this.i18nService.currentLanguage;
    this.isSpanish = this.currentLanguage === LANGS.ES;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserDetailsPage');
  }

  goToRepos(login: string) {
    this.navCtrl.push(ReposPage, {login});
  }

  /**
   * 
   * Sets the new language to the service.
   */
  changeLanguage() {
    this.i18nService.use(this.isSpanish ? LANGS.ES : LANGS.EN);
  }

 /** 
  * Handler function for the toggle component in the view.
  * Calls change language and keeps track of the current language.
  */
  onToggleChange() {
    this.isSpanish = !this.isSpanish;
    this.changeLanguage();
    this.currentLanguage = this.i18nService.currentLanguage;
  }
}

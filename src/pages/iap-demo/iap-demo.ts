import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { IapDragDropIncludeDrvDirective } from './iap-demo.directive';
/*
  Generated class for the IAPDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-iap-demo',
  templateUrl: 'iap-demo.html'
})
export class IAPDemoPage {

  public configOptions ={
    dragDrop: {},
    mcqPage: {},
    fillIn: {}
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IAPDemoPage');
  }

}

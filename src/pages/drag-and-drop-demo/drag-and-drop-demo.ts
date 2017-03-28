import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';
import { MenuController} from 'ionic-angular';
/*
  Generated class for the DragAndDropDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-drag-and-drop-demo',
  templateUrl: 'drag-and-drop-demo.html'
})
export class DragAndDropDemoPage {
  
  private listOrig:any[] = [];
  private listTarget:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dragulaService: DragulaService,
    private alert: AlertController,
    private menu: MenuController
  ) {
    this.menu.swipeEnable(false);
    for (var i = 0; i < 20; i++) {
      this.listOrig.push(`1. < ${i} >`);
      this.listTarget.push(`2. < ${i} >`);
    }
    dragulaService.drag.subscribe((value:any) => {
      console.log("drag:" ,value);
    });
    
    dragulaService.out.subscribe((value: any) => {
      console.log("out:" ,value);
    });
    
    dragulaService.drop.subscribe((value: any) => {
      console.log("drop:" ,value);
    });
    
    // dragulaService.dropModel.subscribe((value: any) => {
    //   // let alert = this.alert.create({
    //   //   title: 'Item moved',
    //   //   subTitle: 'So much fun!',
    //   //   buttons: ['OK']
    //   // });
    //   console.log(this.listOrig, this.listTarget);
    //   // alert.present();
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DragAndDropDemoPage');
  }

}

import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Todos } from '../../providers/todos';

/*
  Generated class for the Scouchdb page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scouchdb',
  templateUrl: 'scouchdb.html'
})
export class ScouchdbPage {
  todos: any;
  constructor(public navCtrl: NavController, public todoService: Todos, public alertCtrl: AlertController) {}

  ionViewDidLoad(){
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });

  }

  /*
  @TODO Shows an alert to add one element
  */
  createTodo(){
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data: any) => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });

    prompt.present();

  }

  /*
  @TODO Shows an alert to update one element
  */
 updateTodo(todo:any){
   let prompt = this.alertCtrl.create({
     title: 'Edit',
     message: 'Change your mind?',
     inputs: [
       {
         name: 'title'
       }
     ],
     buttons: [
       {
         text: 'Cancel'
       },
       {
         text: 'Save',
         handler: (data: any) => {
           this.todoService.updateTodo({
             _id: todo._id,
             _rev: todo._rev,
             title: data.title
           });
         }
       }
     ]
   });

   prompt.present();
 }

 /*
 @TODO Shows alert to delete one element
 */
 deleteTodo(todo: any){
   let prompt = this.alertCtrl.create({
     title:'Delete',
     message: 'drop this item?',
     buttons: [
       {
         text: 'Cancel'
       },{
         text: 'Delete',
         handler: (data: any) =>{
           this.todoService.deleteTodo(todo);
         }
       }
     ]
   });
   prompt.present();
 }
}

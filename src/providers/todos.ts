import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Todos provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Todos {

  data: any;
  db: any;
  remote: any;

  constructor() {

    this.db = new PouchDB('cloudo');

    this.remote = 'http://localhost:5984/cloudo';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);

  }

  /*
    @TODO Get the elements saved int the databases
  */
  getTodos() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result:any) => {
        this.data = [];
        let docs = result.rows.map((row:any) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change:any) => {
          this.handleChange(change);
        });
      }).catch((error:any) => {
        console.log(error);
      });
    });
  }

  /*
    @TODO Create element
  */
  createTodo(todo:any){
    this.db.post(todo);
  }

  /*
    @TODO Update the element
  */
  updateTodo(todo:any){
    this.db.put(todo)
            .then((res:any)=>{
                console.log("Updated")
            }).catch((err:any) => {
                console.log(err);
              }
            );
  }

  /*
    @TODO delete the element
  */
  deleteTodo(todo:any){
    this.db.remove(todo).catch((err:any) => {
      console.log(err);
    });
  }

  /*
    @TODO function to detect the changes
  */
  handleChange(change:any){
    let changedDoc:any = null;
    let changedIndex:any = null;
    this.data.forEach((doc:any, index:any) => {
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }
      //A document was added
      else {
        this.data.push(change.doc);
      }
    }
  }
}

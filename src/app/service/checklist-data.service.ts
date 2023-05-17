import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ChecklistDataService {
  TaskUrl = "https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata.json";
  UserUrl = "https://checklist-4c9fc-default-rtdb.firebaseio.com/users.json";

  UserIdSubject =new Rx.BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  getTaskData() {
    return this.http.get(this.TaskUrl).pipe(Rx.map(responsedata=>{
      const taskArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          taskArray.push({...responsedata[key], id: key})
        }
      }
      return taskArray;
    }));
  }

  postTask(data: any){
   return this.http.post(this.TaskUrl,data)
  }
  //update data to task
  updateTaskData(updateddata: any) {
    return this.http.put(`https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata/${updateddata.id}.json`, updateddata);
  }

  //function to delete data
  deleteTask(id: any) {
    return this.http.delete(`https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata/${id}.json`);
  }

  //User

  //function to get users data
  getUserData() {
    return this.http.get(this.UserUrl).pipe(Rx.map(responsedata=>{
      const UserArray =[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
          UserArray.push({...responsedata[key], id: key})
        }
      }
      return UserArray;
    }));;
  }

  registerUser(userdata:any){
   return this.http.post(this.UserUrl,userdata);
  }


}

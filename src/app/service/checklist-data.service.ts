import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ChecklistDataService {

  TaskUrl = "https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata.json";
  UserUrl = "https://checklist-4c9fc-default-rtdb.firebaseio.com/users.json";



  UpdateComponents =new Rx.Subject<any>();
  dataSubject= new Rx.Subject<any>();
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

  //making subjects 
  getDataObservable() {
    return this.dataSubject.asObservable();
  }

  postTask(data: any){
   return this.http.post(this.TaskUrl,data).subscribe((res)=>{
    console.log(res);
   })
  }
  //update data to task
  updateTaskDataHeading(id:any,updateddata: any) {
    return this.http.patch(`https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata/${id}.json`,updateddata);
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

  getSpecificUserData(id:any){
    return this.http.get(`https://checklist-4c9fc-default-rtdb.firebaseio.com/users/${id}.json`);
  }

}

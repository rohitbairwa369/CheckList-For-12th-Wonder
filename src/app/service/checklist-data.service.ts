import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ChecklistDataService {


  UpdateComponents =new Rx.Subject<any>();
  dataSubject= new Rx.Subject<any>();
  themeArray= new Rx.Subject<any>();
  constructor(private http: HttpClient) { }

  getTaskData(id:any) {
    return this.http.get(`https://mytodo-4405f-default-rtdb.firebaseio.com/users/${id}/taskdata.json`).pipe(Rx.map(responsedata=>{
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

  postTask(data: any,id:any){
   return this.http.post(`https://mytodo-4405f-default-rtdb.firebaseio.com/users/${id}/taskdata.json`,data).subscribe((res)=>{
    console.log(res);
   })
  }
  //update data to task
  updateTaskDataHeading(id:any,userid:any,updateddata: any) {
    return this.http.patch(`https://mytodo-4405f-default-rtdb.firebaseio.com/users/${userid}/taskdata/${id}.json`,updateddata);
  }

  //function to delete data
  deleteTask(id: any,userid:any) {
    return this.http.delete(`https://mytodo-4405f-default-rtdb.firebaseio.com/users/${userid}/taskdata/${id}.json`);
  }

  //User

  //function to get users data
  getUserData() {
    return this.http.get(`https://mytodo-4405f-default-rtdb.firebaseio.com/users.json`).pipe(Rx.map(responsedata=>{
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
   return this.http.post(`https://mytodo-4405f-default-rtdb.firebaseio.com/users.json`,userdata);
  }

  getSpecificUserData(id:any){
    return this.http.get(`https://mytodo-4405f-default-rtdb.firebaseio.com/users/${id}.json`);
  }

  //function to update user data
  updateUserData(Userid:any,data:any){
    return this.http.patch(`https://mytodo-4405f-default-rtdb.firebaseio.com/users/${Userid}.json`,data).subscribe((res)=>{
    console.log(res);
   })
  }


  


}

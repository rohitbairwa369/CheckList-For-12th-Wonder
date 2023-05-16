import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ChecklistDataService {
  TaskUrl = "https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata.json";
  UserUrl = "https://checklist-4c9fc-default-rtdb.firebaseio.com/users.json";

  constructor(private http: HttpClient) { }

  getTaskData() {
    return this.http.get(this.TaskUrl).pipe(map(responsedata=>{
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
    return this.http.put(`https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata.json/${updateddata.id}`, updateddata);
  }

  //function to delete data
  deleteTask(id: any) {
    return this.http.delete(`https://checklist-4c9fc-default-rtdb.firebaseio.com/taskdata.json/${id}`);
  }

  //User

  //function to get users data
  getUserData() {
    return this.http.get(this.UserUrl);
  }


}

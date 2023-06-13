import { Component, OnInit } from '@angular/core';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';



@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.scss']
})
export class TaskAssignComponent implements OnInit {
  CurrentUserLoginId: string;
  dataSubscription: any;
  users: any[];
  DataCome:boolean=false;
  constructor(private taskdata:ChecklistDataService) { }

  ngOnInit(): void {
    this.taskdata.getUserData().subscribe((res)=>{
      this.users = res;
      this.DataCome=true;
    })

  }

}

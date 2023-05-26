import { Component, OnInit,Input, SimpleChanges, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-listtemplate',
  templateUrl: './listtemplate.component.html',
  styleUrls: ['./listtemplate.component.scss']
})
export class ListtemplateComponent{
//   @Input() currentId:number;
  
//   todaysTask: any[] = [];
//   CurrentUserLoginId: string;
//   dataSubscription:Subscription;
//   constructor(private taskdataService:ChecklistDataService) { }


//   ngOnDestroy(){
//     this.dataSubscription.unsubscribe();
//   }

//   ngOnInit(): void {
//     this.CurrentUserLoginId =localStorage.getItem("UserId");
//     this.dataSubscription = this.taskdataService.getTaskData().subscribe((data)=>{
//       this.todaysTask = data.filter((data) => data.userId === this.CurrentUserLoginId);
//       console.log(this.todaysTask);
//     })
//   }

// historydata:any[]=[];

//   changedtaskdata:any;

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['currentId'] && !changes['currentId'].firstChange) {
//       const retrievedObject = localStorage.getItem('taskdata');
//       this.todaysTask = JSON.parse(retrievedObject);
//       const retrievedhistory = localStorage.getItem('edithistory');
//       this.historydata = JSON.parse(retrievedhistory);
//     }
//   }
  

}

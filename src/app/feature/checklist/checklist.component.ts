import { Component, EventEmitter, OnInit, Output ,OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [MessageService]
})
export class ChecklistComponent implements OnInit {
  @Output() openSubtasks = new EventEmitter<any>();
  @Output() sendtaskupdate = new EventEmitter<any>();


  addlistvalue: boolean = false;
  todaysTask: any[] = []
  currentDay = new Date().getUTCDate();
  currentMonth = new Date().getUTCMonth() +1;
  currentYear = new Date().getUTCFullYear();
  curenetDayText = new Date().getUTCDay()
  newTaskName: string;
  newTaskdescription: number;
  selectedValues:boolean=false;
  sortAscending: boolean = true;
  formatedDate :any;
  defaultDate:Date;
  CurrentUserLoginId:any;


constructor(private messageService: MessageService, private taskdataService : ChecklistDataService){}

onRowEditInit(tasks: any) {
    this.todaysTask[tasks.id] = {...tasks};
}


historydata:any[]=[];

onRowEditSave(tasks: any) {
    if (tasks.heading.length > 0) {
      console.log("Loook",tasks.heading);
      
      const history ={
        id: tasks.id,
        previous: this.todaysTask[tasks.id].heading,
        current : tasks.heading,
        time : new Date().toLocaleString(),
      };
      this.historydata.push(history);
      localStorage.setItem("edithistory",JSON.stringify(this.historydata));
      this.todaysTask[tasks.id].heading = tasks.heading;
      localStorage.setItem("taskdata",JSON.stringify(this.todaysTask));
        this.messageService.add({severity:'success', summary: 'Success', detail:'Task is updated'});
    }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Black Input'});
    }
}

onRowEditCancel(task: any, index: number) {
    this.todaysTask[index] = this.todaysTask[task.id];
    delete this.todaysTask[task.id];
}


  //this function will emit id so that list-template and navbar can listen to it and update their records
  openSubtasksbar(id:string){
    this.openSubtasks.emit(id);
  }

 
//Retriving the the value from local storage & if local storage does not contain any key-value pair ,i am setting value in local storage
  ngOnInit(): void {
    this.defaultDate = new Date(2023, 4, 17);
    this.formatedDate =this.defaultDate; 
    this.CurrentUserLoginId =localStorage.getItem("UserId");
    this.taskdataService.getTaskData().subscribe((data)=>{
      this.todaysTask = data.filter((data) => data.userId === this.CurrentUserLoginId);
      console.log(this.todaysTask);
    })
  }
  
  deleteTask(id:any){
    const index = this.todaysTask.findIndex(task => task.id === id);
    if (index !== -1) {
      this.todaysTask.splice(index, 1);
    }
    localStorage.setItem("taskdata",JSON.stringify(this.todaysTask));
    this.taskdataService.deleteTask(id).subscribe((res)=>{
      console.log("Deleted Item" ,res)
    })
    this.messageService.add({ severity: 'success', summary: 'Task Deleted', detail: 'Succesfully'});
  }

  addlist():any {
    this.addlistvalue = true;
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'List Added'});
    this.addlistvalue = false;
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Blank Input' });
  }

  //sorting task data alphabetically
  sortTaskData(){
    this.sortAscending = !this.sortAscending;
    this.todaysTask.sort((a, b) => {
    const comparison = a.heading.localeCompare(b.heading);
    return this.sortAscending ? comparison : -comparison;
  });
  }

 //adding task and updating value stored in local storage
  addnewtask() {
    if (this.newTaskName.length > 0) {
      const newTask = {
        userId : this.CurrentUserLoginId,
        heading: this.newTaskName,
        desc: this.newTaskdescription,
        date:this.formatedDate,
        completed: this.selectedValues
      };
      this.todaysTask.push(newTask);
      this.taskdataService.postTask(newTask).subscribe((res)=>{
        console.log(res);
      })
      localStorage.setItem("taskdata",JSON.stringify(this.todaysTask));
      this.newTaskName = '';
      this.newTaskdescription = null;
      this.showSuccess() //show success message
    } else {
      this.showError()
    }
  }


}


import { Component, EventEmitter, OnInit ,OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
import {ConfirmationService} from 'primeng/api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ChecklistComponent implements OnInit ,OnDestroy{

  dataSubscription : Subscription;

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
  defaultDate:Date;
  CurrentUserLoginId:any;
  formatedDate = new Date();
  displayModal: boolean;
  modalClickedId:any;
  loading:boolean;
  completed:boolean;
  priority:any;
  priorityLevel:any[] =[];
  scheduleDateTime =new Date();
  updatedDesc:any;
  @ViewChild('calendar') calendar;


constructor(private messageService: MessageService, private taskdataService : ChecklistDataService,private confirmationService: ConfirmationService){
this.priorityLevel=[
  {
    name:'Low Priority',
    level:1
  },
  {
    name:'Medium Priority',
    level:2
  },
  {
    name:'High Priority',
    level:3
  }
]
}

//this will help us to toggle calendar
toggleCalendar() {
  this.calendar.toggle();
}

onRowEditInit(tasks: any) {
    this.todaysTask[tasks.id] = {...tasks};
}

markItComplete(tasks:any){
  if(tasks.id!=undefined){
  this.completed= !tasks.completed;
  const itemToUpdate = this.todaysTask.find(item => item.id === tasks.id);
  if (itemToUpdate) {
  if(itemToUpdate.completed!=this.completed){
    itemToUpdate.completed = this.completed;
    const updateddata ={
      userId : this.CurrentUserLoginId,
      heading: tasks.heading,
      desc: tasks.desc,
      date: tasks.formatedDate,
      completed: this.completed,
      completeTime:this.formatedDate,
      timeDate : tasks.timeDate,
    }
    this.taskdataService.updateTaskDataHeading(tasks.id,updateddata).subscribe((res)=>{
      console.log("Status Updated to",res);
    });
  }

  }
}
else{
  this.messageService.add({ severity: 'error', summary: 'Action Prohibited', detail: 'You cannot mark it done too quickly' });
}
 
}

historydata:any[]=[];

onRowEditSave(tasks: any) {
    if (tasks.heading.length > 0) {
      console.log("Loook",tasks.heading);
      const updateddata ={
        userId : this.CurrentUserLoginId,
        heading: tasks.heading,
        desc: tasks.desc,
        date: tasks.formatedDate,
        completed: tasks.completed,
        time: tasks.time,
        priority: tasks.priority,
        schedule: tasks.schedule
      }
      this.taskdataService.updateTaskDataHeading(tasks.id,updateddata).subscribe((res)=>{
        console.log("Heading Updated to",tasks.heading);
      });
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
        this.taskdataService.dataSubject.next(this.todaysTask);
      }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Black Input'});
    }
}

onRowEditCancel(task: any, index: number) {
    this.todaysTask[index] = this.todaysTask[task.id];
    delete this.todaysTask[task.id];
}


 
//Retriving the the value from local storage & if local storage does not contain any key-value pair ,i am setting value in local storage
  ngOnInit(): void {
    this.defaultDate = new Date(2023, 4, 17);

    this.CurrentUserLoginId =localStorage.getItem("UserId");
    this.dataSubscription = this.taskdataService.getTaskData().subscribe((data)=>{
      this.todaysTask = data.filter((data) => data.userId === this.CurrentUserLoginId);
      this.loading=true;
      setTimeout(() => {
        this.loading=false
      }, 700);
      this.taskdataService.dataSubject.next(this.todaysTask)
    })
    this.taskdataService.UpdateComponents.subscribe((res)=>{
      const parts = res.split('/');
      this.formatedDate = new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
    })
  }

  ngOnDestroy(){
      this.dataSubscription?.unsubscribe();
  }
  
//delete
  confirm(event: Event,id:any) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const index = this.todaysTask.findIndex(task => task.id === id);
          if (index !== -1) {
            this.todaysTask.splice(index, 1);
          }
          localStorage.setItem("taskdata",JSON.stringify(this.todaysTask));
          this.taskdataService.deleteTask(id).subscribe((res)=>{
            console.log("Deleted Item" ,res)
          })
          this.messageService.add({ severity: 'success', summary: 'Task Deleted', detail: 'Succesfully'});
        },
        reject: () => {
            //reject action
            console.log("Closed")
        }
    });
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
 
//show modal
  showModalDialog(id:any) {
    this.displayModal = true;
    this.modalClickedId =id;
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
const formattedTime = this.formatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    this.CurrentUserLoginId =localStorage.getItem("UserId");
    if (this.newTaskName.length > 0) {
      const newTask = {
        userId : this.CurrentUserLoginId,
        heading: this.newTaskName,
        desc: this.newTaskdescription,
        date:this.formatedDate.toLocaleString().split(',').splice(0,1)[0],
        timeDate : this.formatedDate,
        time: formattedTime,
        completed: this.selectedValues,
        priority: this.priority.level,
        schedule: this.scheduleDateTime
      };
      this.todaysTask.push(newTask);
      this.taskdataService.postTask(newTask).subscribe((res)=>{
        console.log(res);
      })
      this.taskdataService.dataSubject.next(this.todaysTask)
      this.newTaskName = '';
      this.newTaskdescription = null;
      this.showSuccess() //show success message
    } else {
      this.showError()
    }
  }


}


import { Component, OnInit ,OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
import {ConfirmationService} from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [MessageService,ConfirmationService],
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
  defaultDate:Date;
  CurrentUserLoginId:any;
  formatedDate = new Date();
  displayModal: boolean;
  modalClickedId:any;
  loading:boolean;
  completed:boolean;
  priority:any;
  priorityLevel:any[] =[];
  statusLevel:any[]=[];
  scheduleDateTime =new Date();
  updatedDesc:any;
  showeditor:boolean=true;
  @ViewChild('calendar') calendar;
  ModalHeading:any;
  ModalDesc:any;
  ByDateTasks:any[];
  ModalDueDate: any;
  ModelPriority: any;
  @ViewChild('statusInplace') instatusInplaceplace;
  hidInplace:boolean=true;
  ModelStatus:any;
  CalculatedTimeDiff:any;

constructor(private router: Router,private messageService: MessageService, private taskdataService : ChecklistDataService,private confirmationService: ConfirmationService){
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

this.statusLevel=[
  {
    name:'Todo',
    color:'#a8a8a8'
  },
  {
    name:'In Progress',
    color:'#fcba03'
  },
  {
    name:'Completed',
    color:'#12b53e'
  }
]

this.CurrentUserLoginId =localStorage.getItem("UserId");
this.dataSubscription = this.taskdataService.getTaskData(this.CurrentUserLoginId).subscribe((data)=>{
  this.todaysTask = data.filter((data) => data.userId === this.CurrentUserLoginId);
  this.loading=true;
  setTimeout(() => {
    this.loading=false
  }, 700);
  this.taskdataService.dataSubject.next(this.todaysTask)
})

}

calculateTimeLeft(task:any){

const scheduleTime = new Date(task.schedule);
const taskAddedTime = new Date();
if(scheduleTime>taskAddedTime){
const timeDiff = Math.abs(scheduleTime.getTime() - taskAddedTime.getTime());
const timeDif = scheduleTime.getTime() - taskAddedTime.getTime();
console.log(timeDif)
const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + (days*24));
console.log(days)
const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
this.CalculatedTimeDiff = [hours,minutes,seconds,99];
}else{
  this.CalculatedTimeDiff= [0,0,0,0];
}
}

hideInplace(){
    this.hidInplace=!this.hidInplace;
    this.instatusInplaceplace.activate();
if(!this.hidInplace)
{
  this.instatusInplaceplace.deactivate();
}

}

//this will help us to toggle calendar
toggleCalendar() {
  this.calendar.toggle();
}

toggle()
{
  this.showeditor=!this.showeditor;
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
      status :tasks.status
    }
    this.taskdataService.updateTaskDataHeading(tasks.id,this.CurrentUserLoginId,updateddata).subscribe((res)=>{
      console.log("Status Updated to",res);
    });
  }

  }
}
else{
  this.messageService.add({ severity: 'error', summary: 'Action Prohibited', detail: 'You cannot mark it done too quickly' });
}
 
}


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
        schedule: tasks.schedule,
        status: tasks.status
      }
      this.taskdataService.updateTaskDataHeading(tasks.id,this.CurrentUserLoginId,updateddata).subscribe((res)=>{
        console.log("Heading Updated to",tasks.heading);
      });
      const history ={
        id: tasks.id,
        previous: this.todaysTask[tasks.id].heading,
        current : tasks.heading,
        time : new Date().toLocaleString(),
      };
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

//function to take edit from modal
onEditModalSave(tasks:any){
  if (this.ModalHeading.length > 0) {
    const updateddata ={
      userId : this.CurrentUserLoginId,
      heading: this.ModalHeading,
      desc: this.ModalDesc,
      date: tasks.formatedDate,
      completed: this.completed,
      time: tasks.time,
      priority: this.ModelPriority,
      schedule: this.ModalDueDate,
      status: this.ModelStatus
    }
    this.taskdataService.updateTaskDataHeading(tasks.id,this.CurrentUserLoginId,updateddata).subscribe((res)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task Updated'});
    });
    this.displayModal = false;
    this.toggle();
    this.router.navigate(['/home/todo/']);
}}

 
//Retriving the the value from local storage & if local storage does not contain any key-value pair ,i am setting value in local storage
  ngOnInit(): void {
    this.defaultDate = new Date(2023, 4, 17);
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
          this.taskdataService.deleteTask(id,this.CurrentUserLoginId).subscribe((res)=>{
            console.log("Deleted Item" ,res)
            this.messageService.add({ severity: 'success', summary: 'Task Deleted', detail: 'Succesfully'});
          },(error)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Failed'});
          })
         
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
  showModalDialog(tasks:any) {
    this.ModalHeading =tasks.heading;
    this.ModalDesc=tasks.desc;
    this.ModalDueDate = tasks.schedule;
    this.ModelPriority = tasks.priority;
    this.modalClickedId =tasks.id;
    this.ModelStatus = tasks.status;
    this.calculateTimeLeft(tasks);
    this.displayModal = true;
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
        priority: this.priority,
        schedule: this.scheduleDateTime,
        status: {
            'name':'Todo',
            'color':'#a8a8a8'
          }      
      };
      this.todaysTask.push(newTask);
      this.taskdataService.postTask(newTask,this.CurrentUserLoginId);
      this.taskdataService.dataSubject.next(this.todaysTask)
      this.newTaskName = '';
      this.newTaskdescription = null;
      this.showSuccess() //show success message
    } else {
      this.showError()
    }
  }

  


}


import { Component, OnInit, OnDestroy, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ChecklistComponent implements OnInit, OnDestroy {

  dataSubscription: Subscription;
  public Editor = BalloonEditor;
 

  
  addlistvalue: boolean = false;
  todaysTask: any[] = []
  currentDay = new Date().getUTCDate();
  currentMonth = new Date().getUTCMonth() + 1;
  currentYear = new Date().getUTCFullYear();
  curenetDayText = new Date().getUTCDay()
  newTaskName: string;
  newTaskdescription: string;
  selectedValues: boolean = false;
  defaultDate: Date;
  CurrentUserLoginId: any;
  formatedDate = new Date();
  displayModal: boolean;
  modalClickedId: any;
  loading: boolean;
  completed: boolean;
  priority: any;
  priorityLevel: any[] = [];
  statusLevel: any[] = [];
  scheduleDateTime = new Date();
  updatedDesc: any;
  showeditor: boolean = true;
  @ViewChild('calendar') calendar;
  ModalHeading: any;
  ModalDesc: any;
  ByDateTasks: any[];
  ModalDueDate: any;
  ModelPriority: any;
  @ViewChild('statusInplace') instatusInplaceplace;
  hidInplace: boolean = true;
  ModelStatus: any;
  CalculatedTimeDiff: any;
  themeArray: any;
  @ViewChild('Modelhead', { static: false }) Modelhead: ElementRef;
  hashtags: { name: string; code: string; }[];
  SelectedHashtag:any;
  


  constructor(private router: Router, private messageService: MessageService, private taskdataService: ChecklistDataService, private confirmationService: ConfirmationService) {
    this.priorityLevel = [
      {
        name: 'Low Priority',
        level: 1
      },
      {
        name: 'Medium Priority',
        level: 2
      },
      {
        name: 'High Priority',
        level: 3
      }
    ]

    this.statusLevel = [
      {
        name: 'Todo',
        color: '#a8a8a8'
      },
      {
        name: 'In Progress',
        color: '#fcba03'
      },
      {
        name: 'Completed',
        color: '#12b53e'
      }
    ]

    this.hashtags = [
      {name: '#important', code: 'NY'},
      {name: '#urgent', code: 'RM'},
  ];

    this.getTaskDataTodo();

  }


  getDataFromDiv() {
    const divContent = this.Modelhead.nativeElement.innerHTML;
    return divContent;
  }

  getTaskDataTodo() {
    this.CurrentUserLoginId = localStorage.getItem("UserId");
    this.dataSubscription = this.taskdataService.getTaskData(this.CurrentUserLoginId).subscribe((data) => {
      this.todaysTask = data;
      this.loading = true;
      setTimeout(() => {
        this.loading = false
      }, 700);
      this.taskdataService.dataSubject.emit(this.todaysTask);
    })
  }

  calculateTimeLeft(task: any) {
    const scheduleTime = new Date(task.schedule);
    const taskAddedTime = new Date();
    if (scheduleTime > taskAddedTime) {
      const millisecondsDifference = scheduleTime.getTime() - taskAddedTime.getTime();
      const secondsDifference = Math.floor(millisecondsDifference / 1000);

      const days = Math.floor(secondsDifference / 86400);
      const hours = Math.floor((secondsDifference % 86400) / 3600);
      const minutes = Math.floor(((secondsDifference % 86400) % 3600) / 60);
      const remainingSeconds = ((secondsDifference % 86400) % 3600) % 60;


      this.CalculatedTimeDiff = [hours, minutes, remainingSeconds, 99, days];
    } else {
      this.CalculatedTimeDiff = null;
    }
  }

  hideInplace() {
    this.hidInplace = !this.hidInplace;
    this.instatusInplaceplace.activate();
    if (!this.hidInplace) {
      this.instatusInplaceplace.deactivate();
    }

  }

  //this will help us to toggle calendar
  toggleCalendar() {
    this.calendar.toggle();
  }

  toggle() {
    this.showeditor = !this.showeditor;
  }

  onRowEditInit(tasks: any) {
    this.todaysTask[tasks.id] = { ...tasks };
  }

  markItComplete(tasks: any) {
    if (tasks.id != undefined) {
      this.completed = !tasks.completed;
      const itemToUpdate = this.todaysTask.find(item => item.id === tasks.id);
      if (itemToUpdate) {
        if (itemToUpdate.completed != this.completed) {
          itemToUpdate.completed = this.completed;
          const updateddata = {
            userId: this.CurrentUserLoginId,
            heading: tasks.heading,
            desc: tasks.desc,
            date: tasks.formatedDate,
            completed: this.completed,
            completeTime: this.formatedDate,
            timeDate: tasks.timeDate,
            status: tasks.status
          }
          this.taskdataService.updateTaskDataHeading(tasks.id, this.CurrentUserLoginId, updateddata).subscribe((res) => {
            console.log("Status Updated to", res);
          });
        }

      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Action Prohibited', detail: 'You cannot mark it done too quickly' });
    }

  }


  onRowEditSave(tasks: any) {
    if (tasks.heading.length > 0) {
      const updateddata = {
        userId: this.CurrentUserLoginId,
        heading: tasks.heading,
        desc: tasks.desc,
        date: tasks.formatedDate,
        completed: tasks.completed,
        time: tasks.time,
        priority: tasks.priority,
        schedule: tasks.schedule,
        status: tasks.status,
        history : {
          id: tasks.id,
          previous: this.todaysTask[tasks.id].heading,
          current: tasks.heading,
          time: new Date(),
        }
      }
      this.taskdataService.updateTaskDataHeading(tasks.id, this.CurrentUserLoginId, updateddata).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task is updated' });
      },(e)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task not updated' });
      });

      this.todaysTask[tasks.id].heading = tasks.heading;

      this.taskdataService.dataSubject.next(this.todaysTask);
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Black Input' });
    }
  }

  onRowEditCancel(task: any, index: number) {
    this.todaysTask[index] = this.todaysTask[task.id];
    delete this.todaysTask[task.id];
  }

  //function to take edit from modal
  onEditModalSave(tasks: any) {
    this.ModalHeading=this.getDataFromDiv() 
    if (this.ModalHeading.length > 0) {
      const updateddata = {
        userId: this.CurrentUserLoginId,
        heading: this.ModalHeading,
        desc: this.ModalDesc,
        date: tasks.formatedDate,
        completed: this.completed,
        time: tasks.time,
        priority: this.ModelPriority,
        schedule: this.ModalDueDate,
        status: this.ModelStatus,
      }
      this.taskdataService.updateTaskDataHeading(tasks.id, this.CurrentUserLoginId, updateddata).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task Updated' });
      });
      this.displayModal = false;
      this.showeditor = false;
      setTimeout(() => {
        this.getTaskDataTodo();
      }, 2000)
    }
  }


  //Retriving the the value from local storage & if local storage does not contain any key-value pair ,i am setting value in local storage
  ngOnInit(): void {
    this.defaultDate = new Date(2023, 4, 17);
    this.taskdataService.UpdateComponents.subscribe((res) => {
      const parts = res.split('/');
      this.formatedDate = new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
    })
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }

  //delete
  confirm(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.todaysTask.findIndex(task => task.id === id);
        if (index !== -1) {
          this.todaysTask.splice(index, 1);
        }
        this.taskdataService.deleteTask(id, this.CurrentUserLoginId).subscribe((res) => {
          console.log("Deleted Item", res)
          this.messageService.add({ severity: 'success', summary: 'Task Deleted', detail: 'Succesfully' });
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Failed' });
        })
      },
      reject: () => {
        //reject action
        console.log("Closed")
      }
    });
  }



  addlist(): any {
    this.addlistvalue = true;
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'List Added' });
    this.addlistvalue = false;
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Blank Input' });
  }

  //show modal
  showModalDialog(tasks: any) {
    this.ModalHeading = tasks.heading;
    this.ModalDesc = tasks.desc;
    this.ModalDueDate = tasks.schedule;
    this.ModelPriority = tasks.priority;
    this.modalClickedId = tasks.id;
    this.ModelStatus = tasks.status;
    this.calculateTimeLeft(tasks);
    this.showeditor = true;
    this.hidInplace = false;
    this.displayModal = true;
  }


  //adding task and updating value stored in local storage
  addnewtask() {
    const formattedTime = this.formatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    this.CurrentUserLoginId = localStorage.getItem("UserId");
    if (this.newTaskName.length > 0) {
      const newTask = {
        userId: this.CurrentUserLoginId,
        heading: this.newTaskName,
        desc: this.newTaskdescription,
        date: this.formatedDate.toLocaleString().split(',').splice(0, 1)[0],
        timeDate: this.formatedDate,
        time: formattedTime,
        completed: this.selectedValues,
        priority: this.priority,
        schedule: this.scheduleDateTime,
        status: {
          'name': 'Todo',
          'color': '#a8a8a8'
        },
        tag:this.SelectedHashtag
      };
      this.todaysTask.push(newTask);
      this.taskdataService.postTask(newTask, this.CurrentUserLoginId);
      this.taskdataService.dataSubject.emit(this.todaysTask);
      this.newTaskName = '';
      this.newTaskdescription = '';
      this.showSuccess() //show success message

    } else {
      this.showError()
    }
  }




}


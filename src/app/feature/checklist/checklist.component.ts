import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

interface City{
  name:string;
  code:string;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [MessageService]
})
export class ChecklistComponent implements OnInit {
  @Output() openSubtasks = new EventEmitter<any>();
  @Output() sendtaskupdate = new EventEmitter<any>();

  onRowEditInit(tasks: any) {
    this.todaysTask[tasks.id] = {...tasks};
}

onRowEditSave(tasks: any) {
    if (tasks.heading.length > 0) {
      console.log("Loook",this.todaysTask[tasks.id]);
      // this.todaysTask[tasks.id].heading.heading = this.todaysTask[tasks.id];
      // localStorage.setItem("taskdata",JSON.stringify(this.todaysTask[tasks.id]));
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
  today:string="Today";

  openSubtasksbar(id:number){
    this.openSubtasks.emit(id);
  }

  comparedate:string;
  

  inputstate: boolean = false;
  closeInput() {
    console.log(this.inputstate)
    this.inputstate = !this.inputstate;
  }

  cities: City[];

  selectedCities: City[];

  ngOnInit(): void {
    this.cities = [
      { name: 'Mr.Rohit', code: 'NY' },
      { name: 'Mr.Chandan', code: 'RM' },
    ];
    const retrievedObject = localStorage.getItem('taskdata');
    console.log(JSON.parse(retrievedObject));
    this.todaysTask.push(JSON.parse(retrievedObject));
  }
  ngAfterViewInit() {

  }

  
  addlistvalue: boolean = false;

  addlist(): any {
    this.addlistvalue = true;
  }
  constructor(private messageService: MessageService) {

  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'List Added'});
    this.addlistvalue = false;


  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Blank Input' });

  }

  todaysTask: any[] = [
    {
      id: "f230fh0g3",
      heading: "I have to make a checklist",
      desc: "ddjvhdvkjdvkj",
      date: '4',
      subtasks: [
        {
          id: "mbvjkgip5",
          name: "I have to make a navbar component",
          completed: true,
        },
        {
          id: "vbb124btr",
          name: "I have to make a sidebar component",
          completed: false,
        },
      ],
    },
    {
      id: "nvklal433",
      heading: "I have to take reflections from Aditiya and Gaurav",
      desc: "ddjvhdvkjdvkj",
      date: '5',
      subtasks: [
        {
          id: "zz21cz3c1",
          name: "I have to domcument their reflection",
          completed: true,
        },
        {
          id: "244wgerg2",
          name: "I have to fill contribution form",
          completed: true,
        },
        {
          id: "h456wer53",
          name: "I have to make sure aditya and gaurav are participating in workshops",
          completed: false,
        },
      ],
    },
    {
      id: "jd38ksl49",
      heading: "Prepare for meeting with team",
      desc: "Need to go through project plan and milestones",
      date: '6',
      subtasks: [
        {
          id: "kdg82jsh1",
          name: "Review project plan",
          completed: true,
        },
        {
          id: "hdk39jwl2",
          name: "Prepare presentation slides",
          completed: false,
        },
        {
          id: "sjd39lsm4",
          name: "Send meeting agenda to team members",
          completed: false,
        },
      ],
    },
    {
      id: "ks82jf73l",
      heading: "Finish coding the login page",
      desc: "Need to add form validation and error handling",
      date: '4',
      subtasks: [
        {
          id: "md83ksn1",
          name: "Add form validation",
          completed: false,
        },
        {
          id: "ks93ndj2",
          name: "Add error handling",
          completed: false,
        },
      ],
    },
    {
      id: "jd93ksl28",
      heading: "Research new web development frameworks",
      desc: "Need to find options for front-end and back-end development",
      date: '8',
      subtasks: [
        {
          id: "md73ksn1",
          name: "Research front-end frameworks",
          completed: false,
        },
        {
          id: "ks53ndj2",
          name: "Research back-end frameworks",
          completed: false,
        },
        {
          id: "js83ksn4",
          name: "Compare and evaluate options",
          completed: false,
        },
      ],
    }
  ];




  currentDay = new Date().getUTCDate();
  currentMonth = new Date().getUTCMonth();
  currentYear = new Date().getUTCFullYear();
  curenetDayText = new Date().getUTCDay()

  newTaskName: string;
  newTaskdescription: number;

  addnewtask() {
    if (this.newTaskName.length > 0) {
      const newTask = {
        id: this.generateId(),
        heading: this.newTaskName,
        desc: this.newTaskdescription,
        date:this.currentDay,
        subtasks: [
          {
            id: this.generateId(),
            name: "Add your First Task",
            completed: false,
          }
        ]
      };
      this.todaysTask.push(newTask);
      this.sendtaskupdate.emit(newTask);
      localStorage.setItem("taskdata",JSON.stringify(newTask));
      this.newTaskName = '';
      this.newTaskdescription = null;
      this.showSuccess()
    } else {
      this.showError()
    }

  }
currentdate:number = new Date().getDay();
  changeDateAdd(){
    this.currentdate=this.currentDay
    if(this.currentDay<31){
      this.currentDay++;
      if(this.currentDay-this.currentdate==1)
      {
        this.today="Tommorow"
      }else{
        this.today="Todos"
      }
    }
    if(this.currentDay==31 && this.currentMonth<12){
      this.currentMonth++;
      this.currentDay=1;

    }
  }
  changeDateSub(){
    if(this.currentDay>1)
    {
      this.currentDay--;
      if(this.currentDay.toString()==this.comparedate)
      {
        this.today="Today"
      }
    }
    if(this.currentDay==1 && this.currentMonth<12){
      this.currentMonth--;
      this.currentDay=31;
  
    }
  }


  generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}


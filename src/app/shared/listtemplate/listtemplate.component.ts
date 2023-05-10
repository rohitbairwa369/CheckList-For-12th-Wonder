import { Component, OnInit,Input ,AfterViewInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-listtemplate',
  templateUrl: './listtemplate.component.html',
  styleUrls: ['./listtemplate.component.scss']
})
export class ListtemplateComponent implements OnInit {
  @Input() currentId:number;
  @Input() taskdata:any;

max: any;

  constructor() { }
  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('taskdata');
    console.log(JSON.parse(retrievedObject));
    this.todaysTask.push(JSON.parse(retrievedObject));
  }

  todaysTask: any[] = [
    {
      id: "f230fh0g3",
      heading: "I have to make a checklist",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, ",
      date: '5',
      subtasks: [
        {
          id: "nvklal433",
          name: "I have to domcument their reflection",
          completed: true,
        },
        {
          id: "nvklal433",
          name: "I have to fill contribution form",
          completed: true,
        },
        {
          id: "nvklal433",
          name: "I have to make sure aditya and gaurav are participating in workshops",
          completed: false,
        },
      ],
    },
    {
      id: "jd38ksl49",
      heading: "Prepare for meeting with team",
      desc: "Need to go through project plan and milestones.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      desc: "Need to add form validation and error handling.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: '4',
      subtasks: [
        {
          id: "ks82jf73l",
          name: "Add Subtasks",
          completed: false,
        },
        {
          id: "ks82jf73l",
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

  
  AfterViewInit(){
    console.log(this.currentId);
  }

  subtask:any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskdata'] && !changes['taskdata'].firstChange) {
      this.subtask = changes['taskdata'].currentValue;
      this.todaysTask.push(this.subtask);
    }
  }
  

   getTaskChCount(id: number): string {
    const item = this.todaysTask.find(item => item.id === this.currentId);
    return item ? item.heading : '';
  }
  

}

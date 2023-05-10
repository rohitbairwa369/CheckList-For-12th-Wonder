import { Component, EventEmitter, OnInit,Output ,Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Input() updateData:any;
  subtask: any;

  constructor() { }
  searching:boolean=false;
  ngOnInit(): void {
  }

  searchkey:any;

  
  get searchresult() {
    this.searching=true;
    return this.todaysTask.filter(product => product.heading.toLowerCase().includes(this.searchkey.toLowerCase()));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateData'] && !changes['updateData'].firstChange) {
      this.subtask = changes['updateData'].currentValue;
      this.todaysTask.push(this.subtask);
    }
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
      date: '7',
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


}
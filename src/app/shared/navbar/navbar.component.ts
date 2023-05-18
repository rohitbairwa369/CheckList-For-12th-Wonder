import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Input() currentId: number;
  subtask: any;

  constructor(private router : Router,private taskdata:ChecklistDataService) { }
  searching: boolean = false;
  ngOnInit(): void {
    const id = localStorage.getItem("UserId");
    const retrievedObject = localStorage.getItem('taskdata');
    if (retrievedObject != null) {
      console.log(JSON.parse(retrievedObject));
      this.todaysTask = JSON.parse(retrievedObject);
    }
    this.taskdata.getSpecificUserData(id).subscribe((res)=>{
      this.userData = res;
      console.log("From Navbar", this.userData);
    });
  }

  userData:any;
  searchkey: any;


  get searchresult() {
    this.searching = true;
    return this.todaysTask.filter(product => product.heading.toLowerCase().includes(this.searchkey.toLowerCase()));
  }

  //declaring array to store retrived output
  todaysTask: any[] = [];

  //to show and hide the logout option
  showlog = false;
  showlogout() {
    return this.showlog = !this.showlog;
  }

  logoutSession(){
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('UserId');
    this.router.navigate(['/login']);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentId'] && !changes['currentId'].firstChange) {
      const retrievedObject = localStorage.getItem('taskdata');
      this.todaysTask = JSON.parse(retrievedObject);
    }
    
  }


  
}
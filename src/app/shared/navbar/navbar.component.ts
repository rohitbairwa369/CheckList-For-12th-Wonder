import { Component, EventEmitter, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  @Output() toggleSidebar = new EventEmitter<boolean>();

  subtask: any;
  CurrentUserLoginId: string;
  dataSubscription: Subscription;

  constructor(private router : Router,private taskdata:ChecklistDataService) { }
  ngOnDestroy(): void {
   this.dataSubscription.unsubscribe();
  }
  searching: boolean = false;
  ngOnInit(): void {
    this.CurrentUserLoginId =localStorage.getItem("UserId");
    this.dataSubscription = this.taskdata.getTaskData().subscribe((data)=>{
      this.todaysTask = data.filter((data) => data.userId === this.CurrentUserLoginId);
      console.log(this.todaysTask);
    })
    this.taskdata.getSpecificUserData(this.CurrentUserLoginId).subscribe((res)=>{
      this.userData = res;
      console.log("From Navbar", this.userData);
    });
  }

  userData:any;
  searchkey: any;


  get searchresult() {
    this.searching = true;
    return this.todaysTask.filter(product => product.heading?.toLowerCase().includes(this.searchkey.toLowerCase()));
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
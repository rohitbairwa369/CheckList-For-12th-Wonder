import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<boolean>();

  subtask: any;
  CurrentUserLoginId: string;
  dataSubscription: Subscription;
  notification_bar: boolean = false;
  themeArray: any = ['#d33f00'];
  //declaring array to store retrived output
  todaysTask: any[] = [];
  userData: any;
  searchkey: any;
  countLog: any = 0;

  constructor(private router: Router, private taskdata: ChecklistDataService) { }

  searching: boolean = false;
  ngOnInit(): void {
    this.CurrentUserLoginId = localStorage.getItem("UserId");
    this.getUserDataNavbar();
    this.themefunction();
    this.taskdata.dataSubject.subscribe((res) => {
      this.todaysTask = res;
    })
    this.taskdata.UserDataSubject.subscribe((res) => {
      this.userData = res;
    })

    this.taskdata.showHideLoginOption.subscribe((res)=>{
      this.showlog=res;
    })
  }

  themefunction() {
    this.taskdata.themeArray.subscribe((res) => {
      this.themeArray = res;
    })

    const themeColor = localStorage.getItem('themeColor');
    if (themeColor) {
      this.themeArray[0] = themeColor;
    }
  }

  // handleClick() {
  //   this.countLog++;
  //   console.log('clicked outside', this.countLog);
  // }


  getUserDataNavbar() {
    this.taskdata.getSpecificUserData(this.CurrentUserLoginId).subscribe((res) => {
      this.userData = res;
    });
  }


  get searchresult() {
    this.searching = true;
    return this.todaysTask.filter(task => task.heading.toLowerCase().includes(this.searchkey?.toLowerCase()));
  }

  //to show and hide the logout option
  showlog = false;
  showlogout() {
    this.showlog = !this.showlog;
  }

  logoutSession() {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('UserId');
    this.router.navigate(['/login']);
  }

  showDateTodo(date: any) {
    this.taskdata.UpdateComponents.emit(date);
    this.searching = false;
  }

  hideSearching() {
    setTimeout(() => {
      this.searching = false;
    }, 2000);
  }

}
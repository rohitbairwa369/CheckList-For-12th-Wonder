import { Component, HostListener, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  taskdata:any[]=[];
  ngOnInit(): void {
  }

  isSidebarOpen = true;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 600) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  currentId:number;
  currentSeenid(id:number){
    this.currentId=id;
  }


  currentSeentask(task:any[]){
    this.taskdata=task;
    console.log(task);
    console.log("hello",this.taskdata);
  }
}

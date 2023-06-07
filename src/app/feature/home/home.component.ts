import { Component, HostListener, OnInit, SimpleChanges} from '@angular/core';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  themeArray: any=['#d33f00','','','#ececec'];
  constructor(private taskdata :ChecklistDataService) { }

 
  ngOnInit(): void {
    this.taskdata.themeArray.subscribe((res)=>{
      this.themeArray= res;
    })
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



}

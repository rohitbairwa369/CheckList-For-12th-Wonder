import { Component, OnInit } from '@angular/core';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private taskdata: ChecklistDataService) { }

  ngOnInit(): void {
  }

}

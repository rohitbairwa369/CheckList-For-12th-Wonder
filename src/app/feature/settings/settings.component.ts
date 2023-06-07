import { Component, OnInit } from '@angular/core';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  navbar:any='#d33f00';
  backColor:any='#f2f2f2';
  ColorText:any='#1c1c1c';
  sidebarColor:any='#ececec';

  constructor(private taskdataService: ChecklistDataService) { }

  ngOnInit(): void {
  }

  savetheme(){
    this.taskdataService.themeArray.next([this.navbar,this.backColor,this.ColorText,this.sidebarColor]);
  }
}

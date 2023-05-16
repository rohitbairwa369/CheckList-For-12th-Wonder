import { Component, OnInit,Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-listtemplate',
  templateUrl: './listtemplate.component.html',
  styleUrls: ['./listtemplate.component.scss']
})
export class ListtemplateComponent implements OnInit {
  @Input() currentId:number;

todaysTask: any[] = [];
  constructor() { }
  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('taskdata');
    console.log(JSON.parse(retrievedObject));
    this.todaysTask = JSON.parse(retrievedObject);
  }

historydata:any[]=[];

  changedtaskdata:any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentId'] && !changes['currentId'].firstChange) {
      const retrievedObject = localStorage.getItem('taskdata');
      this.todaysTask = JSON.parse(retrievedObject);
      const retrievedhistory = localStorage.getItem('edithistory');
      this.historydata = JSON.parse(retrievedhistory);
    }
  }
  

}

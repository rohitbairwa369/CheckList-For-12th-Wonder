import { Component, OnInit } from '@angular/core';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  date =new Date();
  todaysData:any[]=[];
  GraphData:any[]=[];
  currentIndex: any;
  constructor(private taskdata:ChecklistDataService) { }

  ngOnInit(): void {
    this.taskdata.getTaskData().subscribe((res)=>{
      this.todaysData=res;
    });
    setTimeout(() => {
      this.getGraphData(this.todaysData);
    }, 3000);
  }
  
  getGraphData(todaysData:any[]){
    for (const [index,obj] of todaysData.entries()) {
    if(obj.date==this.date.toLocaleDateString().split('T').splice(0,1)[0]){
      console.log(obj.date);
      this.currentIndex = index;
    }
    }
    if(this.todaysData.length>7){
    const ToIndex = this.currentIndex-6;
    for(let i = this.currentIndex ;i>=ToIndex; i--)
    {
      this.GraphData.push(this.todaysData[i])
     console.log(i);
     console.log(this.GraphData.length)
    }
  }
  }


}

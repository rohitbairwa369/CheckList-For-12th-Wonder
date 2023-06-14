import { Component, OnInit } from '@angular/core';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';



@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.scss']
})
export class TaskAssignComponent implements OnInit {
  CurrentUserLoginId: string;
  dataSubscription: any;
  users: any[];
  DataCome:boolean=false;
  selectedItem:any;
  filteredCountries: any[];
  constructor(private taskdata:ChecklistDataService) { }

  ngOnInit(): void {
    this.taskdata.getUserData().subscribe((res)=>{
      this.users = res;
      this.DataCome=true;
    })

  }

  filterCountry(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.users.length; i++) {
      let country = this.users[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

}

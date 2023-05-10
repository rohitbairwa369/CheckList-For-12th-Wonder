import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ChecklistComponent } from './checklist/checklist.component';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [
    HomeComponent,
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimengModule
  ],
  exports:[
    HomeComponent,
    ChecklistComponent
  ]
})
export class FeatureModule { }

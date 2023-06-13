import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ChecklistComponent } from './checklist/checklist.component';
import { PrimengModule } from '../primeng/primeng.module';
import { featureRoutingModule } from './feature-routing.module';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TaskAssignComponent } from './task-assign/task-assign.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChecklistComponent,
    HistoryComponent,
    SettingsComponent,
    ProfileComponent,
    TaskAssignComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimengModule,
    featureRoutingModule,
    CKEditorModule
  ],
  exports:[
    HomeComponent,
    ChecklistComponent
  ]
})
export class FeatureModule { }

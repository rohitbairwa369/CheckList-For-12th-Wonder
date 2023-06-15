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

@NgModule({
  declarations: [
    HomeComponent,
    ChecklistComponent,
    HistoryComponent,
    SettingsComponent,
    ProfileComponent,

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

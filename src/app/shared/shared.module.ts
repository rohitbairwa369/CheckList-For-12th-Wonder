import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListtemplateComponent } from './listtemplate/listtemplate.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ListtemplateComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    ListtemplateComponent
  ]
})
export class SharedModule { }

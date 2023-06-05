import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CountdownComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    CountdownComponent
  ]
})
export class SharedModule { }

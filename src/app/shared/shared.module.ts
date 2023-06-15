import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { CountdownComponent } from './countdown/countdown.component';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { CheckIfClickOutSideDirective } from '../../app/check-if-click-out-side.directive'


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CountdownComponent,
    NotificationBarComponent,
    CheckIfClickOutSideDirective
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    CountdownComponent,
    CheckIfClickOutSideDirective
  ]
})
export class SharedModule { }

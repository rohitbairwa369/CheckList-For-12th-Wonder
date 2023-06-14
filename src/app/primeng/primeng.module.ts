import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InplaceModule } from 'primeng/inplace';
import {TableModule} from 'primeng/table';
import {DragDropModule} from 'primeng/dragdrop';
import {RouterModule} from '@angular/router';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import {SkeletonModule} from 'primeng/skeleton';
import {ColorPickerModule} from 'primeng/colorpicker';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    InplaceModule,
    TableModule,
    DragDropModule,
    RouterModule,
    CalendarModule,
    SliderModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    TooltipModule,
    ScrollPanelModule,
    PasswordModule,
    CheckboxModule,
    ConfirmPopupModule,
    InputTextareaModule,
    EditorModule,
    SkeletonModule,
    ColorPickerModule,
    AutoCompleteModule
  ],
  exports:[
    ButtonModule,
    InputTextModule,
    ToastModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    InplaceModule,
    TableModule,
    DragDropModule,
    RouterModule,
    CalendarModule,
    SliderModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    TooltipModule,
    ScrollPanelModule,
    PasswordModule,
    CheckboxModule,
    ConfirmPopupModule,
    InputTextareaModule,
    EditorModule,
    SkeletonModule,
    ColorPickerModule,
    AutoCompleteModule
  ]
})
export class PrimengModule { }

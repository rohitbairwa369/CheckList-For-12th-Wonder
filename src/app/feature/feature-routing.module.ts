import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";
import { HistoryComponent } from "./history/history.component";
import { SettingsComponent } from "./settings/settings.component";
import { ProfileComponent } from "./profile/profile.component";
// import { TaskAssignComponent } from "./task-assign/task-assign.component";


const routes: Routes = [
    { path: 'todo', component: ChecklistComponent },
    { path: 'history', component: HistoryComponent },
    { path:'settings',component: SettingsComponent},
    { path:'profile', component: ProfileComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class featureRoutingModule { }
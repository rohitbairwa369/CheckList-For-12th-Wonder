import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";
import { HistoryComponent } from "./history/history.component";
import { SettingsComponent } from "./settings/settings.component";


const routes: Routes = [
    { path: 'todo', component: ChecklistComponent },
    { path: 'history', component: HistoryComponent },
    { path:'settings',component: SettingsComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class featureRoutingModule { }
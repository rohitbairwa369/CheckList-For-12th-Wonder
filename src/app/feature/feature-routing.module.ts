import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";
import { HistoryComponent } from "./history/history.component";


const routes: Routes = [
    { path: 'todo', component: ChecklistComponent },
    { path: 'history', component: HistoryComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class featureRoutingModule { }
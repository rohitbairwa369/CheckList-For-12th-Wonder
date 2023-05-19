import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './feature/home/home.component';
import { AuthGuard } from './auth/login/auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard] ,children: [
    {
      path: '',
      redirectTo: 'todo',
      pathMatch: 'full'
    },
    {
      path: '',
      loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

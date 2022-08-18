import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {component:HomeComponent, path: ''},
  {component:AuthComponent, path: 'auth'},
  {component:RegisterFormComponent, path: 'register'},
  {component:ReportComponent, path: 'report'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

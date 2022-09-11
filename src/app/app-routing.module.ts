import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GradeBookComponent } from './grade-book/grade-book.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './forms/register/register.component';
const routes: Routes = [
  {component:SignupComponent, path: 'signup'},
  {component:LoginComponent, path: 'login'},
  {component:RegisterComponent, path: 'register'},
  {component:GradeBookComponent, path: 'grade-book'},
  {component:HomeComponent, path: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

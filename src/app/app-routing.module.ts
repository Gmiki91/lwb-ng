import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GradeBookComponent } from './grade-book/grade-book.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ClassBookComponent } from './class-book/class-book.component';
import { DataBookComponent } from './data-book/data-book.component';
import { AdminGuard } from './auth/admin.guard';
import { TeacherGuard } from './auth/teacher.guard';
const routes: Routes = [
  {component:SignupComponent, path: 'signup'},
  {component:LoginComponent, path: 'login'},
  {component:RegisterComponent, path: 'register',canActivate:[AdminGuard]},
  {component:GradeBookComponent, path: 'grade-book',canActivate:[TeacherGuard]},
  {component:ClassBookComponent, path: 'class-book',canActivate:[TeacherGuard]},
  {component:DataBookComponent, path: 'data-book',canActivate:[TeacherGuard]},
  {component:HomeComponent, path: '',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

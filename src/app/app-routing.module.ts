import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GradeBookComponent } from './core/grade-book/grade-book.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ClassBookComponent } from './core/class-book/class-book.component';
import { DataBookComponent } from './core/data-book/data-book.component';
import { TeacherGuard } from './auth/guards/teacher.guard';
import { TopicComponent } from './core/topics/topic.component';
const routes: Routes = [
  // {component:SignupComponent, path: 'signup'},
  {component:LoginComponent, path: 'login'},
  {component:RegisterComponent, path: 'register'},
  {component:GradeBookComponent, path: 'grade-book',canActivate:[TeacherGuard]},
  {component:ClassBookComponent, path: 'class-book',canActivate:[TeacherGuard]},
  {component:DataBookComponent, path: 'data-book',canActivate:[TeacherGuard]},
  {component:TopicComponent, path: 'topic',canActivate:[TeacherGuard]},
  {component:HomeComponent, path: '',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from './auth/signup/signup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { GradeBookComponent } from './grade-book/grade-book.component';
import { AuthenticationInterceptor } from './auth/authentication.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkComponent } from './grade-book/mark/mark.component';
import {MatDividerModule} from '@angular/material/divider';
import { ClassBookComponent } from './class-book/class-book.component';
import { StudentComponent } from './data-book/student-data/student.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DataBookComponent } from './data-book/data-book.component';
import { AttendanceComponent } from './data-book/attendance/attendance.component';
import { GradesComponent } from './data-book/grades/grades.component';
import { FoodOrderComponent } from './data-book/food-order/food-order.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './shared/spinner/spinner.component'
import { HeaderComponent } from './header/header.component';
import { TranslocoRootModule } from './transloco-root.module';
import {SummaryComponent} from './summary/summary.component';
import { TopicComponent } from './grade-book/topic/topic.component';
import { TopicListComponent } from './shared/topic-list/topic-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SignupComponent,
    GradeBookComponent,
    MarkComponent,
    ClassBookComponent,
    StudentComponent,
    DataBookComponent,
    AttendanceComponent,
    GradesComponent,
    FoodOrderComponent,
    SpinnerComponent,
    HeaderComponent,
    SummaryComponent,
    TopicComponent,
    TopicListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    TranslocoRootModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

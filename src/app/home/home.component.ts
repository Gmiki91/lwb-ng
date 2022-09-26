import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { ClassRooms } from '../models/constants';
import { StudentService } from '../services/student.service';
type Subject = "English" | "Math" | "Biology" | "History" | "Chemistry" | "Literature";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  classRooms = ClassRooms;
  isChecked: boolean = false;
  children$?: Observable<Student[]>;
  constructor(
    private studentService: StudentService,
    private router: Router) {
    this.children$ = this.studentService.getChildren();
  }
  ngOnInit(): void {
  }

  openGradeBook(grade: number[], subject: Subject): void {
    this.router.navigate(['grade-book'], { state: { subject, grade } })
  }
}

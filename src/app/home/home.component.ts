import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
type Subject = "English" | "Math" | "Biology" |"History"|"Chemistry" |"Literature";
type Classrom = {
  grade: number[];
  subjects: Subject[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isChecked: boolean = false;
  classRooms: Classrom[];
  students$?:Observable<Student[]>
  children$?:Observable<Student[]>
  constructor(
    private studentService: StudentService,
    private router:Router) {
    this.students$ = this.studentService.getAllStudents();
    this.children$ = this.studentService.getChildren();
    this.classRooms = [
      { grade: [1, 2], subjects: ["Biology", "Math"] },
      { grade: [3, 4], subjects: ["English", "Math"] },
      { grade: [5, 6], subjects: ["History", "Literature"] },
      { grade: [7, 8], subjects: ["English", "Math","Biology"] },
      { grade: [9, 10,11], subjects: ["Chemistry"] },
    ]
  }

  ngOnInit(): void {
  }

  openGradeBook(grade: number[],subject:Subject): void {
    this.router.navigate(['grade-book'], { state: { subject,grade } })
  }
}

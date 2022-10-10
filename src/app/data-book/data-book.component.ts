import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentComponent } from './student-data/student.component';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';

@Component({
  selector: 'app-data-book',
  templateUrl: './data-book.component.html',
  styleUrls: ['./data-book.component.scss']
})
export class DataBookComponent implements OnInit {
  students$!: Observable<Student[]>;
  constructor(private route: ActivatedRoute, private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.students$ = this.studentService.getStudentsOfClass(params['grade'])
    });
  }
  openData(student: Student): void {
    const dialogRef = this.dialog.open(StudentComponent, { data: student });
  }
  openAttendance(student: Student): void {
    const dialogRef = this.dialog.open(AttendanceComponent, { data: student });
  }
  openGrades(student: Student): void {
    const dialogRef = this.dialog.open(GradesComponent, { data: student });
  }
}

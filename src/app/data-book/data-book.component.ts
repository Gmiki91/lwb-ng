import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
export class DataBookComponent implements OnInit{
  archivedStudents$!: Observable<Student[]>;
  activeStudents$!: Observable<Student[]>;
  grade!:string;
  loading=true;
  @Input() parentMode: boolean = false;
  constructor(private route: ActivatedRoute, private studentService: StudentService, private dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.archivedStudents$ = this.studentService.getArchivedStudents().pipe(tap(() => this.loading = false))
    this.activeStudents$ = this.studentService.getActiveStudents().pipe(tap(() => this.loading = false))
    if (this.parentMode) {
     this.studentService.getChildren();
    } else {
      this.route.queryParams.subscribe(params => {
        this.grade=params['grade'];
        this.studentService.getStudentsOfClass(params['grade']);
      });
    }
    
  }

  openData(student: Student): void {
    this.dialog.open(StudentComponent, { data: student });
  }
  openAttendance(student: Student): void {
    this.dialog.open(AttendanceComponent, { data: student });
  }
  openGrades(student: Student): void {
    this.dialog.open(GradesComponent, { data: student });
  }

  toggleArchive(student: Student):void{
    this.studentService.toggleArchive(student,this.parentMode);
    this.loading=true;
  }
}

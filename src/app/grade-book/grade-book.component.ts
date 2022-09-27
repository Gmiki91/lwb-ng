import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MarkComponent } from '../forms/mark/mark.component';
import { Result, StudentResult } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { ClassRooms } from '../models/constants'
@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.scss']
})
export class GradeBookComponent implements OnInit {
  months = [
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 }
  ];
  data$?: Observable<StudentResult[]>;
  subject?: string;
  grade!: number;
  subjects!: string[];
  constructor(private studentService: StudentService, private dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.grade = params['grade'];
      this.subjects = ClassRooms
        .filter(classroom => classroom.grade === +this.grade)
        .map(classroom => classroom.subjects)[0];
    });
    this.data$ = this.studentService.getStudentResults();
  }

  changedSubject(subject: string) {
    if (subject !== this.subject){
      this.subject = subject;
      this.studentService.requestStudentResults(this.grade,this.subject);
    }

  }

  ratedInMonth(monthIndex: number, results: Result[]): Result[] {
    const resultsInMonth = results.filter(result => {
      const month = new Date(result.date).getMonth() + 1;
      return month === monthIndex;
    });
    return resultsInMonth;
  }

  addMark(id: string) {
    const dialogRef = this.dialog.open(MarkComponent, { data: {} as Result });
    dialogRef.afterClosed().subscribe((result: Result) => {
      if (result !== undefined && this.subject) {
        this.studentService.giveStudentResult(id, result, this.grade, this.subject);
      }
    });
  }

  editMark(id: string, result: Result) {
    const dialogRef = this.dialog.open(MarkComponent, { data: result });
    dialogRef.afterClosed().subscribe((result: Result) => {
      if (result !== undefined && this.subject) {

        this.studentService.updateStudentResult(id, result, this.grade, this.subject);
      }
    });
  }
}

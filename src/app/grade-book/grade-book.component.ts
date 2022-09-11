import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarkComponent } from '../forms/mark/mark.component';
import { Result, StudentResult } from '../models/student.model';
import { StudentService } from '../services/student.service';
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
  ]
  data$?: Observable<StudentResult[]>;
  subject!: string;
  grade!: number[];
  constructor(private router: Router, private studentService: StudentService, private dialog: MatDialog) {
    let nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.grade = nav.extras.state['grade'];
      this.subject = nav.extras.state['subject'];
      this.studentService.requestStudentResults(this.grade, this.subject)
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.data$ = this.studentService.getStudentResults();
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
      if (result !== undefined) {
        this.studentService.giveStudentResult(id, result, this.grade, this.subject);
      }
    });
  }
    editMark(id:string,result:Result){
      const dialogRef = this.dialog.open(MarkComponent, { data:result});
      dialogRef.afterClosed().subscribe((result: Result) => {
        if (result !== undefined) {
         
          this.studentService.updateStudentResult(id, result, this.grade, this.subject);
        }
      });
  }
}

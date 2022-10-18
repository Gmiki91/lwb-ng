import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GradeBook, Student } from 'src/app/shared/models/student.model';
import { format } from 'date-fns'
@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss','../data-book.component.scss'],
})
export class GradesComponent implements OnInit {

  page:GradeBook|null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public student: Student) {
  }

  ngOnInit(): void {
   this.student.gradeBook
  }
  dateOf(date:number):string{
    const dateToString = format(new Date(date),'dd/MM/yyyy')
    return dateToString;
  }
  changeSubject(page:GradeBook){
    this.page=page;
    this.page.results.sort((a,b) =>new Date(a.date).getTime()-new Date(b.date).getTime());
  }

}

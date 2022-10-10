import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/shared/models/student.model';
import { format } from 'date-fns'
@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['../data-book.component.scss'],
})
export class GradesComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<GradesComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student) {
  }

  ngOnInit(): void {
   this.student.gradeBook
  }
  dateOf(date:number):string{
    const dateToString = format(new Date(date),'dd/MM/yyyy')
    return dateToString;
  }
}

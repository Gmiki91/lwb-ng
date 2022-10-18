import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { Student } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['../data-book.component.scss'],
})
export class AttendanceComponent implements OnInit {
  missedClasses: string[]=[];
  constructor(private dialogRef: MatDialogRef<AttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student) {
  }

  ngOnInit(): void {
    this.missedClasses = this.student.missedClassAt
    .map(missedClass=> new Date(missedClass))
    .map(missedClass=>format(new Date(missedClass),'yyyy/MM/dd'))
    .sort((a,b)=>new Date(a).getTime() - new Date(b).getTime())
  }
}

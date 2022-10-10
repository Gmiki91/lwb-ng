import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['../data-book.component.scss'],
})
export class AttendanceComponent implements OnInit {

  missedClasses: Date[]=[];
 
  constructor(private dialogRef: MatDialogRef<AttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student) {
  }

  ngOnInit(): void {
    this.missedClasses = this.student.missedClassAt.map(missedClass=> new Date(missedClass));
    
  }
}

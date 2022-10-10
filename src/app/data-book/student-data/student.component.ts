import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['../data-book.component.scss'],
})
export class StudentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student) {
  }

  ngOnInit(): void {
  }

}

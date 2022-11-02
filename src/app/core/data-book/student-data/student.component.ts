import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/shared/models/student.model';
import { format } from 'date-fns';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['../data-book.component.scss'],
})
export class StudentComponent implements OnInit {
  formattedDate:string='';
  constructor(
    @Inject(MAT_DIALOG_DATA) public student: Student) {
  }

  ngOnInit(): void {
    this.formattedDate = format(new Date(this.student.dob),'yyyy/MM/dd');
  }

}

import { Component, OnInit } from '@angular/core';
import {Student} from '../models/student.model'
import {Observable} from 'rxjs';
import { StudentService } from '../services/student.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  students$!:Observable<Student[]>
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
   this.students$ =   this.studentService.getAllStudents();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-class-book',
  templateUrl: './class-book.component.html',
  styleUrls: ['./class-book.component.scss']
})
export class ClassBookComponent implements OnInit {
  students$?:Observable<Student[]>
  constructor(private route: ActivatedRoute, private studentService: StudentService) {
   
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.students$ = this.studentService.getStudentsOfClass(params['grade']);
    }
  );
  }

}

import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Result, StudentResult } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { ClassRooms } from '../shared/models/constants'
type StudentMark = {
  id: string,
  mark: number
}
@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.scss']
})
export class GradeBookComponent implements OnInit {
  months = [
    { name: 'september', value: 9 },
    { name: 'october', value: 10 },
    { name: 'november', value: 11 },
    { name: 'december',  value: 12 },
    { name: 'january', value: 1 },
    { name: 'february', value: 2 },
    { name: 'march',  value: 3 },
    { name: 'april', value: 4 },
    { name: 'may', value: 5 },
    { name: 'june', value: 6 }
  ];

  studentMarks: StudentMark[] = [];
  data$?: Observable<StudentResult[]>;
  resultData: Result = {} as Result;
  subject!: string;
  grade!: number;
  subjects!: string[];
  editingId: string | undefined;
  redMark: Result | undefined;
  loading = false;
  
  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.grade = params['grade'];
      this.subjects = ClassRooms
        .filter(classroom => classroom.grades.includes(+this.grade))
        .map(classroom => classroom.subjects)[0];
    });
    this.data$ = this.studentService.getStudentResults().pipe(
      tap(() => this.loading = false)
    )
  }

  changedSubject(subject: string) {
    if (subject !== this.subject) {
      this.subject = subject;
      this.studentService.requestStudentResults(this.grade, this.subject);
      this.loading = true;
    }
  }

  changeMark(id: string, mark: number): void {
    let found = false;
    this.studentMarks.forEach(studentMark => {
      if (studentMark.id === id) {
        studentMark.mark = mark;
        found = true;
      }
    })
    if (!found)
      this.studentMarks.push({ id, mark })
  }

  save(result: Result | null): void {
    if (result) {
      this.loading = true;
      if (this.editingId) {
        //submitted editing
        this.studentService.updateStudentResult(this.editingId, result, this.grade, this.subject);
        this.editingId = undefined;
        this.redMark = result;
      } else {
        // submitted new result
        this.studentService.giveStudentsResult(this.studentMarks, result, this.grade, this.subject);
        this.studentMarks = [];
      }
    } else {
      //cancelled editing
      this.editingId = undefined;
      this.redMark = undefined;
      this.resultData={} as Result;
    }
  }
  ratedInMonth(monthIndex: number, results: Result[]): Result[] {
    if (results) {
      let resultsInMonth = results.filter(result => {
        const month = new Date(result.date).getMonth() + 1;
        return month === monthIndex;
      });
      resultsInMonth.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return resultsInMonth;
    }
    return [];
  }

  editMark(id: string, result: Result) {
    this.resultData = result;
    this.editingId = id;
    this.redMark = result;
  }
}

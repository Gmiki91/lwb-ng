import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Result, StudentResult } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { TopicService } from '../shared/services/topic.service';
type StudentMark = {
  id: string,
  mark?: number,
  textAssesment?: string
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
    { name: 'december', value: 12 },
    { name: 'january', value: 1 },
    { name: 'february', value: 2 },
    { name: 'march', value: 3 },
    { name: 'april', value: 4 },
    { name: 'may', value: 5 },
    { name: 'june', value: 6 }
  ];

  studentMarks: StudentMark[] = [];
  data$?: Observable<StudentResult[]>;
  resultData: Result = {} as Result;
  subject!: string;
  grade!: number;
  editingId: string | undefined;
  redMark: Result | undefined;
  loading = false;

  constructor(private studentService: StudentService, private topicService: TopicService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.grade = params['grade']);
    this.data$ = this.studentService.getStudentResults().pipe(tap(() => this.loading = false));
  }

  changedSubject(subject: string): void {
    if (subject !== this.subject) {
      this.subject = subject;
      this.studentService.requestStudentResults(this.grade, this.subject);
      this.topicService.requestTopics(this.subject,this.grade);
      this.loading = true;
    }
  }

  changeMark(id: string, mark: number | Event): void {
    let found = false;
    this.studentMarks.forEach(studentMark => {
      if (studentMark.id === id) {
        found = true;
        if (typeof mark === 'number') {
          studentMark.mark = mark;
        } else {
          const element = mark.currentTarget as HTMLInputElement;
          const value = element.value;
          studentMark.textAssesment = value;
        }
      }
    })

    if (!found) {
      let value;
      //Either text assesment or mark was changed
      if (typeof mark !== 'number') {
        const element = mark.currentTarget as HTMLInputElement
        value = { textAssesment: element.value };
      } else {
        value = { mark: mark };
      }
      // spread operator used to push either textAssesment or mark
      this.studentMarks.push({ id, ...value })
    }

  }
  // delete(studentId: string, result: Result): void {
  //   this.loading = true;
  //   this.studentService.deleteStudentResult(studentId, result, this.grade, this.subject);
  //   this._cancel();
  // }
  save(result: Result | null): void {
    if (result) {
      this.loading = true;
      if (this.editingId) {
        //submitted editing
        this.studentService.updateStudentResult(this.editingId, result, this.grade, this.subject);
        this._cancel();
      } else if (this.studentMarks.length > 0) {
        // submitted new result
        this.studentService.giveStudentsResult(this.studentMarks, result, this.grade, this.subject);
        this.studentMarks = [];
      } else {
        // empty submit
        this.loading = false;
      }
    } else {
      //cancelled editing
      this._cancel();
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

  outsideClick(): void {
    if (this.editingId)
      this._cancel()
  }

  editMark(id: string, result: Result): void {
    this.resultData = { ...result };
    this.editingId = id;
    this.redMark = result;
  }

  _cancel(): void {
    this.editingId = undefined;
    this.redMark = undefined;
    this.resultData = {} as Result;
  }
}

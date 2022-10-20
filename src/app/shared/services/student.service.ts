import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, map, Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Student, StudentResult, Result } from "../models/student.model";

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    studentResult = new Subject<StudentResult[]>;
    studentsActive = new Subject<Student[]>();
    studentsInActive = new Subject<Student[]>();
    constructor(private http: HttpClient, private router: Router) { }

    registerStudent(student: Student): void {
        this.http.post<{ status: string }>(`${environment.url}/students/`, student).subscribe(result => {
            if (result.status === 'success')
                this.router.navigate(['']);
            else
                alert("error")
        })
    }
    getStudentsOfClass(classes: number) {
        return this.http.get<{ status: string, students: Student[] }>(`${environment.url}/students/many/${classes}`).subscribe(result => {
            if (result.status === 'success')this._splitStudents(result.students);
        })
    }

    getChildren() {
        return this.http.get<{ status: string, students: Student[] }>(`${environment.url}/students`).subscribe(result => {
            if (result.status === 'success') this._splitStudents(result.students);
        })
    }

    updateStudents(students: Student[]): Observable<boolean> {
        return this.http.put<{ status: string }>(`${environment.url}/students`, { students }).pipe(map(result => {
            if (result.status === 'success')
                return true;
            return false;
        }))
    }

    updateFoodOrders(student: Student) {
        this.http.put<{ status: string }>(`${environment.url}/students/food`, { student }).subscribe(() => {
        })
    }

    getAllFoodOrders() {
        return this.http.get<{ status: string, result: { date: Date, count: number }[] }>(`${environment.url}/students/food`).pipe(map(value => {
            return value.result;
        }));
    }

    requestStudentResults(grade: number, subject: string) {
        this.http.post<{ status: string, data: StudentResult[] }>(`${environment.url}/students/results`, { grade, subject }).subscribe(result => {
            if (result.status === 'success')
                this.studentResult.next(result.data);
            else
                alert("error")
        })
    }

    giveStudentsResult(studentMarks: { id: string, mark?: number, textAssesment?: string }[], result: Result, grade: number, subject: string) {
        this.http.put<{ status: string }>(`${environment.url}/students/results`, { studentMarks, result, grade, subject }).subscribe(result => {
            if (result.status === 'success')
                this.requestStudentResults(grade, subject)
            else
                alert("error")
        })
    }

    updateStudentResult(studentId: string, result: Result, grade: number, subject: string) {
        this.http.patch<{ status: string }>(`${environment.url}/students/results`, { studentId, result, grade, subject }).subscribe(result => {
            if (result.status === 'success')
                this.requestStudentResults(grade, subject)
            else
                alert("error")
        })
    }

    deleteStudentResult(studentId: string, result: Result, grade: number, subject: string) {
        this.http.request<{ status: string }>('delete',`${environment.url}/students/results`, {body:{ studentId, result, grade, subject }}).subscribe(result => {
            if (result.status === 'success')
                this.requestStudentResults(grade, subject)
            else
                alert("error")
        })
    }

    getActiveStudents(){
        return this.studentsActive.asObservable();
    }
    getArchivedStudents(){
        return this.studentsInActive.asObservable();
    }
    getStudentResults() {
        return this.studentResult.asObservable();
    }

    toggleArchive(student:Student, parentDidIt: boolean) {
        this.http.patch<{ status: string }>(`${environment.url}/students/`,  {student}).subscribe(result => {
            if (result.status === 'success') {
                parentDidIt ? this.getChildren() : this.getStudentsOfClass(student.currentGrade);
            } else
                alert("error");
        })
    }


    private _splitStudents(students: Student[]) {
        const activeStudents = students.filter(student => !student.archived);
        const archivedStudents = students.filter(student => student.archived);
        this.studentsActive.next(activeStudents);
        this.studentsInActive.next(archivedStudents);
    }
}
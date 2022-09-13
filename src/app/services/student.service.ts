import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Student, StudentResult, Result } from "../models/student.model";

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    studentResult = new BehaviorSubject<StudentResult[]>([])
    constructor(private http: HttpClient, private router: Router) { }

    registerStudent(student: Student): void {
        this.http.post<{ status: string }>(`${environment.url}/students/`, student).subscribe(result => {
            if (result.status === 'success') 
                this.router.navigate(['']);
            else
                alert("error")
        })
    }

    // getAllStudents() {
    //     return this.http.get<{  status: string,  students: Student[] }>(`${environment.url}/students/`).pipe(map(result => {
    //         if (result.status === 'success') {
    //             return result.students;
    //         }
    //         return [];
    //     }))
    // }

    getStudentsOfClass(classes:number[]) {
        return this.http.get<{  status: string,  students: Student[] }>(`${environment.url}/students/${classes.join(',')}`).pipe(map(result => {
            if (result.status === 'success') {
                return result.students;
            }
            return [];
        }))
    }

    getChildren(){
        return this.http.get<{ status: string, students: Student[] }>(`${environment.url}/students`).pipe(map(result => {
            if (result.status === 'success') {
                return result.students;
            }
            return [];
        }))
    }


    requestStudentResults(grade: number[], subject: string) {
        this.http.post<{ status: string, data: StudentResult[] }>(`${environment.url}/students/results`, { grade, subject }).subscribe(result => {
            if (result.status === 'success') 
                this.studentResult.next(result.data);
            else
                alert("error")
        })
    }

    giveStudentResult(studentId:string,result: Result,grade: number[],subject: string) {
        this.http.put<{ status: string}>(`${environment.url}/students/results`, { studentId,result,grade,subject }).subscribe(result => {
            if (result.status === 'success') 
               this.requestStudentResults(grade,subject)
            else
                alert("error")
        })
    }

    updateStudentResult(studentId:string,result: Result,grade: number[],subject: string) {
        this.http.patch<{ status: string}>(`${environment.url}/students/results`, { studentId,result,grade,subject }).subscribe(result => {
            if (result.status === 'success') 
               this.requestStudentResults(grade,subject)
            else
                alert("error")
        })
    }
    
    getStudentResults() {
        return this.studentResult.asObservable();
    }
}
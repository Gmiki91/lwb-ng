import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { Student } from "../models/student.model";

@Injectable({
    providedIn:'root'
})

export class StudentService{
    constructor(private http: HttpClient, private router: Router) {}

    registerStudent(firstName:string,lastName:string,grade:string):void{
        this.http.post(`${environment.url}/students/register`,{firstName,lastName, grade}).subscribe(result=>console.log(result))
    }

    getAllStudents(){
       return this.http.get<{success:boolean, data:Student[]}>(`${environment.url}/students/all`).pipe(map(result=>{
            if(result.success){
                return result.data;
            }
            return [];
        }))
    }
}
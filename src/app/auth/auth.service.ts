import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient) {}

    signUp(user:User){
        this.http.post("http://localhost:3000/api/users/signup",user).subscribe(result=>{console.log(result)})
    }
}
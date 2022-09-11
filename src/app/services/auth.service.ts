import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user = new BehaviorSubject<User>({} as User);
    constructor(private http: HttpClient, private router: Router) { }

    signUp(user:User) {
        this.http.post<{ status: string, token:string,user: User }>(`${environment.url}/users/signup`, user).subscribe(result => {
            if (result.status==='success') {
                this.user.next(result.user);
                localStorage.setItem('access_token', result.token);
                this.router.navigate(['/']);
            }

        })
    }
    logIn(email: string, password: string) {
        this.http.post<{ status: string, token:string,user: User }>(`${environment.url}/users/login`, { email, password }).subscribe(
            {
                next: result => {
                    if (result.status==='success') {
                        this.user.next(result.user);
                        localStorage.setItem('access_token', result.token);
                        this.router.navigate(['/']);
                    } else {
                        console.log(result);
                    }
                },
                error: repsonse => {
                    alert(repsonse.error.message)
                }
            });
    }

    getCurrentUser() {
        return this.user.asObservable();
    }
}
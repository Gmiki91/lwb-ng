import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject,tap } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    loggedIn = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient, private router: Router) { }
    signUp(user: User) {
        this.http.post<{ status: string, token: string, type: string, }>(`${environment.url}/users/signup`, user).subscribe(result => {
            if (result.status === 'success') {
                localStorage.setItem('type', result.type);
                localStorage.setItem('access_token', result.token);
                this.loggedIn.next(true);
                this.router.navigate(['/']);
            }
        })
    }

    logIn(email: string, password: string, isTeacher:boolean) {
        return this.http.post<{ status: string, token: string, type: string, message: string }>(`${environment.url}/users/login`, { email, password, isTeacher }).pipe(tap(result => {
            if (result.status === 'success')
                this.loggedIn.next(true);
        }))
    }

    logOut() {
        this.loggedIn.next(false);
    }
    requestLogInStatus() {
        const value = localStorage.getItem('access_token') !== null
        this.loggedIn.next(value);
    }

    getLogInStatus() {
        return this.loggedIn.asObservable();
    }
}
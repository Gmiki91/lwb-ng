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

    signUp(user: User) {
        this.http.post<{ success: boolean, data: User }>(`${environment.url}/users/signup`, user).subscribe(result => {
            if (result.success) {
                localStorage.setItem("type", "" + user.type);
                localStorage.setItem("username",  user.name);
                this.user.next(result.data);
                this.router.navigate(['/']);
            }

        })
    }
    logIn(email: string, password: string) {
        this.http.post<{ success: boolean, data: User }>(`${environment.url}/users/login`, { email, password }).subscribe(result => {
            if (result.success) {
                localStorage.setItem("type", "" + result.data.type);
                localStorage.setItem("username",  result.data.name);
                this.user.next(result.data);
                this.router.navigate(['/']);
            }
        })
    }

    getCurrentUser() {
        return this.user.asObservable();
    }
}
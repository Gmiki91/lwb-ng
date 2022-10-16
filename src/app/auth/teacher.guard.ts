import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

    constructor(private router: Router) { };
    canActivate(): boolean {
        if ( localStorage.getItem('type')==='1') {
            return true;
        } else{
        this.router.navigate(['/']);
            return false;
    }}
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassRooms } from '../shared/models/constants';
import { StudentService } from '../shared/services/student.service';
type Subject = "English" | "Math" | "Biology" | "History" | "Chemistry" | "Literature";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  classRooms = ClassRooms;
  type: '0' | '1' | '2' = '0';
  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type') as '1' | '2' | '0';
    this.studentService.getAllFoodOrders();
  }

  openGradeBook(grade: number[], subject: Subject): void {
    this.router.navigate(['grade-book'], { state: { subject, grade } });
  }
}
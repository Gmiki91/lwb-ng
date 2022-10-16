import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns/esm';
import { Observable } from 'rxjs';
import { StudentService } from '../shared/services/student.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  data$!: Observable<{ date: Date, count: number }[]>
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.data$ = this.studentService.getAllFoodOrders();

  }

  formatDate(date: Date): string {
    const dateToString = format(new Date(date), 'yyyy/MM/dd')
    return dateToString;
  }

  formatCount(count: number): number|string {
    return count % 1 != 0 ? `${Math.floor(count)} : ${(Math.ceil(count%1*100))}` : count;
  }

}

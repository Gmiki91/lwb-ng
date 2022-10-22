import { Component, OnInit } from '@angular/core';
import { ClassRooms } from '../shared/models/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  classRooms = ClassRooms;
  type: '0' | '1' | '2' = '0';
  constructor() { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type') as '1' | '2' | '0';
  }
}
import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Result } from 'src/app/shared/models/student.model';
import { MarkTypes } from '../../shared/models/constants';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
  @Output() save: EventEmitter<Result|null> = new EventEmitter();
  @Input() data: Result = {} as Result;
  @ViewChild('mark') mark?:number
  types = MarkTypes;
  
  constructor() {}

  ngOnInit(): void {
  }

  submit() {
    this.save.next(this.data);
    this.data = {} as Result
  }

  cancel(){
    this.save.next(null);
    this.data = {} as Result
  }
}

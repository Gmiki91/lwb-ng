import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassRooms } from '../models/constants';

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.scss']
})
export class SubjectSelectorComponent implements OnInit {

  @Input() disabled = false;
  @Input() grade!:number;
  @Output() subjectEmitter:EventEmitter<string>=new EventEmitter();
  subjects!: string[];
  constructor() { }

  ngOnInit(): void {
    this.subjects = ClassRooms
    .filter(classroom => classroom.grades.includes(+this.grade))
    .map(classroom => classroom.subjects)[0];
  }

  changedSubject(subject: string):void {
      this.subjectEmitter.emit(subject);
  }

}

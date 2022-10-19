import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Result } from 'src/app/shared/models/student.model';
import { MarkTypes } from '../../shared/models/constants';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent{
  @Output() save: EventEmitter<Result | null> = new EventEmitter();
  @Output() delete: EventEmitter<boolean> = new EventEmitter();
  @Input() data: Result = {} as Result;
  types = MarkTypes;

  constructor() { }

  onSave() {
    this.save.emit(this.data);
    this.data = {} as Result
  }

  onDelete() {
    this.delete.emit(true);
  }

  cancel() {
    this.save.emit(null);
    this.data = {} as Result
  }

}

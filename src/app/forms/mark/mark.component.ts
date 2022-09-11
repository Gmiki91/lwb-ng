import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from 'src/app/models/student.model';
import {MarkTypes} from '../../models/constants';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['../form.scss']
})
export class MarkComponent implements OnInit {
  types = MarkTypes;
  constructor(private dialogRef: MatDialogRef<MarkComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Result) {
     }

  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close(this.data);
  }
}

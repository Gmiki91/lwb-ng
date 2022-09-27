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
  data:Result = {} as Result; 
  constructor() {
     }

  ngOnInit(): void {
  }

  submit() {
   
  }
}

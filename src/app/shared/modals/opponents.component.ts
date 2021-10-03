import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.css']
})
export class OpponentsComponent {

selected: number;
  constructor(public dialogRef: MatDialogRef<OpponentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styles: [],
})
export class DialogConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogConfirmComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  ngOnInit(): void {}

  delete() {
    this.dialogRef.close(true);
  }
  close() {
    this.dialogRef.close();
  }
}

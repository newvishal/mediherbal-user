import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from '../Components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private dialog: MatDialog) {}
  dialogRef;

  openDialog() {
    this.dialogRef = this.dialog.open(LoaderComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}

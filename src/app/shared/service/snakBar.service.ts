import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnakbarService {
  constructor(private sankBar: MatSnackBar) {}
  showSnackBar(message,cssClass){
    this.sankBar.open(message,null,{
      duration:3000,panelClass:[cssClass]
    })
  }
}

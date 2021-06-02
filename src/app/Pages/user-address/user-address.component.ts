import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { state } from './city-data/state-city-list';
import { AddAddressComponent } from './components/add-address/add-address.component';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  constructor(private dialog: MatDialog) {}


  ngOnInit(): void {

  }

  addAddress() {
    this.dialog.open(AddAddressComponent);
  }
}

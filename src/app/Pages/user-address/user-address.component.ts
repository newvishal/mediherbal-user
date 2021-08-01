import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { state } from './city-data/state-city-list';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { UserAddressService } from './service/user-address.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private userAddressService: UserAddressService
  ) {}
  userAddress: any[] = [];
  ngOnInit(): void {
    this.userAddressService.fetchAllAddress().subscribe(
      (userAddess) => {
        console.log(userAddess);
        this.userAddress = userAddess.data.address;
      },
      (err) => {
        if (err.error.err.message === 'Address not Found') {
          this.userAddress = [];
        }
      }
    );
  }

  addAddress() {
    this.dialog.open(AddAddressComponent);
  }
}

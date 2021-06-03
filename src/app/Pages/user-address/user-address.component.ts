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
userAddress:any[]=[]
  ngOnInit(): void {
    this.userAddressService.fetchAllAddress().pipe(tap(userAddess=>{
      this.userAddress=userAddess
      console.log(this.userAddress);

    })).subscribe()
  }

  addAddress() {
    this.dialog.open(AddAddressComponent);
  }
}

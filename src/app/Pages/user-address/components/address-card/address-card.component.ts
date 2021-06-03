import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddressService } from '../../service/user-address.service';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent implements OnInit {
  @Input() useraddress;
  @Input() addressIndex;
  constructor(
    private dialog: MatDialog,
    private addressService: UserAddressService
  ) {}

  ngOnInit(): void {}
  editaddress() {
    this.dialog.open(AddAddressComponent, {
      data: {
        address: this.useraddress,
        addressIndex: this.addressIndex,
      },
    });
  }
  deleteAddress() {
    this.addressService.deteleUserAddress(this.addressIndex);
  }
}

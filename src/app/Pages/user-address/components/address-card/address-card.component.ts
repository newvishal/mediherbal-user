import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { UserAddressService } from '../../service/user-address.service';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent implements OnInit {
  @Input() useraddress;
  @Input() id;
  @Output() refreshData = new EventEmitter<any>();
  constructor(
    private dialog: MatDialog,
    private addressService: UserAddressService,
    private snackBar: SnakbarService
  ) {}

  ngOnInit(): void {}
  editaddress() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      data: {
        address: this.useraddress,
        id: this.useraddress._id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.useraddress = result;
        this.refreshData.emit();
      }
    });
  }
  deleteAddress() {
    this.addressService.deteleUserAddress(this.id).subscribe(
      (response) => {
        this.refreshData.emit();
        this.snackBar.showSnackBar(
          'Address deleted successfully !!',
          'success'
        );
      },
      (err) => {
        this.snackBar.showSnackBar('Unknown error occured !!', 'danger');
      }
    );
  }
}

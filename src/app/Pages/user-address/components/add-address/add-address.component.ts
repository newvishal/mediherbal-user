import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { state } from '../../city-data/state-city-list';
import { UserAddressService } from '../../service/user-address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup;
  StateCityData: any = state;
  states: { state: string; cities: string[] }[] = [];
  constructor(
    private addressService: UserAddressService,
    private dialog: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public editAddressData: any,
    private snackBar: SnakbarService
  ) {}

  ngOnInit(): void {
    for (let statename in this.StateCityData) {
      this.states.push({
        state: statename,
        cities: this.StateCityData[statename],
      });
    }

    if (this.editAddressData) {
      this.addressForm = new FormGroup({
        address: new FormGroup({
          house_number: new FormControl(
            this.editAddressData.address.house_number,
            [Validators.required]
          ),
          street_colony_name: new FormControl(
            this.editAddressData.address.street_colony_name,
            [Validators.required]
          ),
          landmark: new FormControl(this.editAddressData.address.landmark, [
            Validators.required,
          ]),
          state: new FormControl(this.editAddressData.address.state, [
            Validators.required,
          ]),
          city: new FormControl(this.editAddressData.address.city, [
            Validators.required,
          ]),
          pincode: new FormControl(this.editAddressData.address.pincode, [
            Validators.required,
          ]),
          first_name: new FormControl(this.editAddressData.address.first_name, [
            Validators.required,
          ]),
          last_name: new FormControl(this.editAddressData.address.last_name, [
            Validators.required,
          ]),
          mobile_number: new FormControl(
            this.editAddressData.address.mobile_number,
            [Validators.required]
          ),
        }),
      });
    } else if (this.editAddressData == null) {
      this.addressForm = new FormGroup({
        address: new FormGroup({
          house_number: new FormControl('', [Validators.required]),
          street_colony_name: new FormControl('', [Validators.required]),
          landmark: new FormControl('', [Validators.required]),
          state: new FormControl('', [Validators.required]),
          city: new FormControl('', [Validators.required]),
          pincode: new FormControl('', [Validators.required]),
          first_name: new FormControl('', [Validators.required]),
          last_name: new FormControl('', [Validators.required]),
          mobile_number: new FormControl('', [Validators.required]),
        }),
      });
    }
  }
  onSubmit() {
    if (this.editAddressData) {
      this.addressService
        .editUserAddressInfo(
          this.addressForm.value.address,
          this.editAddressData.id
        )
        .subscribe(
          (editResponse) => {
            this.dialog.close(editResponse);
          },
          (err) => {
            this.dialog.close();
          }
        );
    } else if (this.editAddressData == null) {
      this.addressService
        .addnewAddress(this.addressForm.value.address)
        .subscribe(
          (response) => {
            this.dialog.close(response);
            this.snackBar.showSnackBar(
              'Address added successfully !!',
              'success'
            );
          },
          (err) => {
            this.dialog.close();
            this.snackBar.showSnackBar('Something Went Wrong', 'success');
          }
        );
    }
  }
  cancelDopdown() {
    this.dialog.close();
  }
}

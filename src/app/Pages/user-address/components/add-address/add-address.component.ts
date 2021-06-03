import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editAddressData: any
  ) {}

  ngOnInit(): void {
    for (let statename in this.StateCityData) {
      this.states.push({
        state: statename,
        cities: this.StateCityData[statename],
      });
    }

    if (this.editAddressData) {
      //this.editAddressData.address['user_details'].first_name
      this.addressForm = new FormGroup({
        user_details: new FormGroup({
          first_name: new FormControl(
            this.editAddressData.address['user_details'].first_name,
            [Validators.required]
          ),
          last_name: new FormControl(
            this.editAddressData.address['user_details'].last_name,
            [Validators.required]
          ),
          mobile_number: new FormControl(
            this.editAddressData.address['user_details'].mobile_number,
            [Validators.required]
          ),
        }),
        user_address: new FormGroup({
          house_number: new FormControl(
            this.editAddressData.address['user_address'].house_number,
            [Validators.required]
          ),
          street_colony_name: new FormControl(
            this.editAddressData.address['user_address'].street_colony_name,
            [Validators.required]
          ),
          landmark: new FormControl(
            this.editAddressData.address['user_address'].landmark,
            [Validators.required]
          ),
          state: new FormControl(
            this.editAddressData.address['user_address'].state,
            [Validators.required]
          ),
          city: new FormControl(
            this.editAddressData.address['user_address'].city,
            [Validators.required]
          ),
          pincode: new FormControl(
            this.editAddressData.address['user_address'].pincode,
            [Validators.required]
          ),
        }),
      });
    } else if (this.editAddressData == null) {
      this.addressForm = new FormGroup({
        user_details: new FormGroup({
          first_name: new FormControl('', [Validators.required]),
          last_name: new FormControl('', [Validators.required]),
          mobile_number: new FormControl('', [Validators.required]),
        }),
        user_address: new FormGroup({
          house_number: new FormControl('', [Validators.required]),
          street_colony_name: new FormControl('', [Validators.required]),
          landmark: new FormControl('', [Validators.required]),
          state: new FormControl('', [Validators.required]),
          city: new FormControl('', [Validators.required]),
          pincode: new FormControl('', [Validators.required]),
        }),
      });
    }
  }
  onSubmit() {
    if (this.editAddressData) {
      this.addressService.editUserAddressInfo(
        this.addressForm.value,
        this.editAddressData.addressIndex
      );
      this.dialog.closeAll();
    } else if (this.editAddressData == null) {
      this.addressService.addnewAddress(this.addressForm.value);
      this.dialog.closeAll();
    }
  }
  cancelDopdown() {
    this.dialog.closeAll();
  }
}

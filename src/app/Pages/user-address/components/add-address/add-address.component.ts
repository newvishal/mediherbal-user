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
    if (this.editAddressData) {
    }
  }
  onSubmit() {
    console.log(this.addressForm.value);
    this.addressService.addnewAddress(this.addressForm.value);
    this.dialog.closeAll();
  }
  cancelDopdown() {
    this.dialog.closeAll();
  }
  deleteAddress(){

  }
}

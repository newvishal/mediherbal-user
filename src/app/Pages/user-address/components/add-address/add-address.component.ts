import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { state } from '../../city-data/state-city-list';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup;
  StateCityData: any = state;
  states: { state: string; cities: string[] }[] = [];
  constructor() {}

  ngOnInit(): void {
    for (let statename in this.StateCityData) {
      this.states.push({
        state: statename,
        cities: this.StateCityData[statename],
      });
    }
    console.log(this.states);
    this.addressForm = new FormGroup({
      user_details: new FormGroup({
        first_name: new FormControl('Ayush', [Validators.required]),
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

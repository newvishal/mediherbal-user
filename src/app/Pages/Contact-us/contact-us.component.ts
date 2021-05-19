import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  /*
  @description:From Variable
  */
  contactUsForm: FormGroup;
  constructor() {}
  /*
  initializing the contactUsForm by form group
  */
  ngOnInit(): void {
    this.contactUsForm = new FormGroup({
      full_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }
  /*
  @description:this method is executed in submit of the signup form
  */

  onSubmit() {
    console.log(this.contactUsForm.value);
  }
}

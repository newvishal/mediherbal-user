import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { ContactService } from './services/contact.service';

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
  constructor(
    private contactService: ContactService,
    private snackbarService: SnakbarService
  ) {}
  /*
  initializing the contactUsForm by form group
  */
  ngOnInit(): void {
    this.contactUsForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      query: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
    });
  }
  /*
  @description:this method is executed in submit of the signup form
  */

  onSubmit() {
    console.log(this.contactUsForm.value);
    this.contactService.addUsersAddress(this.contactUsForm.value).subscribe(
      (result) => {
        this.snackbarService.showSnackBar(result.message, 'success');
      },
      (err) => {
        this.snackbarService.showSnackBar('Something went wrong', 'danger');
      }
    );
  }
}

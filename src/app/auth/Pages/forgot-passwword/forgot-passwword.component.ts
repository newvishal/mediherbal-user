import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-passwword',
  templateUrl: './forgot-passwword.component.html',
  styleUrls: ['./forgot-passwword.component.scss'],
})
export class ForgotPasswwordComponent implements OnInit {
  /*
  @description:From Variable
  */
  forgotPasswordForm: FormGroup;
  constructor() {}
  /*
  initializing the forgotPasswordForm by form group
  */
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }
  /*
  @description:this method is executed in submit of the signup form
  */

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
  }
}

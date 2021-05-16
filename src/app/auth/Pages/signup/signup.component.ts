import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  /*
  @description:From Variable
  */
  signUpForm: FormGroup;
  constructor(private authService: AuthService) {}
  /*
  initializing the signUpForm by form group
  */
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  /*
  @description:this method is executed in submit of the signup form
  */

  onSubmit() {
    this.authService.userSingup(this.signUpForm.value);
  }
}

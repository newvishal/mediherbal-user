import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
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
  constructor(
    private UserDataService: UserDataService,
    private authService: AuthService,
    private snackbarService: SnakbarService,
    private router: Router,
    private loader: LoaderService
  ) {}
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
    this.loader.openDialog();
    this.authService.userSingup(this.signUpForm.value).subscribe(
      (signupResponse) => {
        this.loader.closeDialog();
        this.snackbarService.showSnackBar(signupResponse.message, 'success');
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      (err) => {
        this.loader.closeDialog();
        this.snackbarService.showSnackBar(err.error.message, 'danger');
      }
    );
  }
}

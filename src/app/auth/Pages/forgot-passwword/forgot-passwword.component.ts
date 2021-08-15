import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-passwword',
  templateUrl: './forgot-passwword.component.html',
  styleUrls: ['./forgot-passwword.component.scss'],
})
export class ForgotPasswwordComponent implements OnInit {
  /*
  @description:From Variable
  */
  showPassword = false;
  forgotPasswordForm: FormGroup;
  passwordChangeForm: FormGroup;
  userId;
  constructor(
    private UserDataService: UserDataService,
    private authService: AuthService,
    private snackbarService: SnakbarService,
    private router: Router,
    private loader: LoaderService,
    private activatedRout: ActivatedRoute
  ) {}
  /*
  initializing the forgotPasswordForm by form group
  */

  passwordType = 'password';
  confirmPasswordType = 'password';
  showPasswordType() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }
  showConfirmPassword() {
    if (this.confirmPasswordType === 'password') {
      this.confirmPasswordType = 'text';
    } else {
      this.confirmPasswordType = 'password';
    }
  }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
    this.passwordChangeForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    });
    this.activatedRout.queryParams.subscribe((res) => {
      if (res.id) {
        this.showPassword = true;
      } else {
        this.showPassword = false;
      }
    });
    this.onChanges();
  }
  /*
  @description:this method is executed in submit of the signup form
  */
  onChanges() {
    this.passwordChangeForm.get('confirm').valueChanges.subscribe((res) => {
      if (res === this.passwordChangeForm.get('password').value) {
        this.passwordChangeForm.get('confirm').setErrors(null);
      } else {
        this.passwordChangeForm.get('confirm').setErrors({ notMatch: true });
      }
    });
  }
  onSubmit() {
    this.loader.openDialog();
    this.authService
      .userForgotPassword(this.forgotPasswordForm.value)
      .subscribe(
        (forgotResponse) => {
          this.snackbarService.showSnackBar(forgotResponse.message, 'success');
          this.userId = forgotResponse.data._id;
          this.forgotPasswordForm.reset();
          this.router.navigate(['/forgot-password'], {
            queryParams: {
              id: forgotResponse.data._id,
            },
            replaceUrl: true,
          });
          this.loader.closeDialog();
        },
        (err) => {
          this.snackbarService.showSnackBar(err.error.message, 'danger');
          this.loader.closeDialog();
        }
      );
  }
  onchangePassword() {
    this.loader.openDialog();
    this.authService
      .changePassword(
        { password: this.passwordChangeForm.value.password },
        this.userId
      )
      .subscribe(
        (changePasswordResponse) => {
          this.snackbarService.showSnackBar(
            changePasswordResponse.message,
            'success'
          );
          this.passwordChangeForm.reset();
          this.router.navigate(['/login'], {
            replaceUrl: true,
          });
          this.loader.closeDialog();
        },
        (err) => {
          this.snackbarService.showSnackBar(err.error.message, 'danger');
          this.loader.closeDialog();
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { UserDataService } from 'src/app/shared/service/userData.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  /*
  @description:From Variable
  */

  passwordType = 'password';
  confirmPasswordType = 'password';
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
  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    });
    this.passwordChangeForm.markAsPristine();
  }
  showPassword() {
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
  onChangesValue() {
    this.passwordChangeForm
      .get('confirm_password')
      .valueChanges.subscribe((res) => {
        if (res === this.passwordChangeForm.get('password').value) {
          this.passwordChangeForm.get('confirm_password').setErrors(null);
        } else {
          this.passwordChangeForm
            .get('confirm_password')
            .setErrors({ notMatch: true });
        }
      });
  }
  onchangePassword() {
    this.loader.openDialog();
    this.authService
      .changePassword(
        { password: this.passwordChangeForm.value.password },
        this.UserDataService.getUserData()._id
      )
      .subscribe(
        (changePasswordResponse) => {
          this.snackbarService.showSnackBar(
            changePasswordResponse.message,
            'success'
          );
          this.UserDataService.logout();
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

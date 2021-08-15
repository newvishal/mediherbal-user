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
  showPassword = false;
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
    });
  }
  /*
  @description:this method is executed in submit of the signup form
  */

  onchangePassword() {
    this.loader.openDialog();
    this.authService
      .changePassword(
        this.passwordChangeForm.value,
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

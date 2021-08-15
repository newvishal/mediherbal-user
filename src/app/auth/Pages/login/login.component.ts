import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /*
  @description:From Variable
  */
  loginForm: FormGroup;
  constructor(
    private UserDataService: UserDataService,
    private authService: AuthService,
    private snackbarService: SnakbarService,
    private router: Router,
    private loader: LoaderService
  ) {}

  passwordType = 'password';
  showPasswordType() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }
  /*
  initializing the loginForm by form group
  */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  /*
  @description:this method is executed in submit of the signup form
  */

  onSubmit() {
    this.loader.openDialog();
    this.authService.userLogin(this.loginForm.value).subscribe(
      (loginResponse) => {
        this.authService.active_user.next(loginResponse.data);
        this.UserDataService.setUserData(loginResponse.data);
        this.snackbarService.showSnackBar(loginResponse.message, 'success');
        this.router.navigate(['/home'], { replaceUrl: true });
        this.loader.closeDialog();
      },
      (err) => {
        this.snackbarService.showSnackBar(err.error.message, 'danger');
        this.loader.closeDialog();
      }
    );
  }
}

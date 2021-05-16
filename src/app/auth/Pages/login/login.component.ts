import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private auth: AngularFireAuth) {}
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
    console.log(this.loginForm.value);
    this.auth
      .signInWithEmailAndPassword(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpModule } from './auth/Pages/signup/signup.module';
import { LoginModule } from './auth/Pages/login/login.module';
import { ForgotPasswordModule } from './auth/Pages/forgot-passwword/forgot-password.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignUpModule,
    LoginModule,
    ForgotPasswordModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

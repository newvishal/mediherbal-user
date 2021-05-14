import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';

const signUpRoute: Routes = [{ path: '', component: SignupComponent }];
@NgModule({
  imports: [RouterModule.forChild(signUpRoute)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}

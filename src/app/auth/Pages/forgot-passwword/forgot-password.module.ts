import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswwordComponent } from './forgot-passwword.component';

@NgModule({
  imports: [ForgotPasswordRoutingModule, SharedModule],
  declarations: [ForgotPasswwordComponent],
})
export class ForgotPasswordModule {}

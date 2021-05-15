import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [SignUpRoutingModule, SharedModule, MaterialModule],
  declarations: [SignupComponent],
})
export class SignUpModule {}

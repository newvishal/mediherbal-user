import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { LoginRoutinModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [LoginRoutinModule, SharedModule, MaterialModule],
  declarations: [LoginComponent],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { SharedModule } from 'src/app/shared/Module/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountService } from './service/account.service';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { SecurityComponent } from './components/security/security.component';

@NgModule({
  imports: [SharedModule, MaterialModule, AccountRoutingModule],
  declarations: [AccountComponent, UserInformationComponent, SecurityComponent],
  providers: [AccountService],
})
export class AccountsModule {}

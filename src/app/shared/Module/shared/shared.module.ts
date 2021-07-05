import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from 'src/app/Pages/user-address/components/add-address/add-address.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [AddAddressComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddAddressComponent,
  ],
  providers: [DatePipe],
})
export class SharedModule {}

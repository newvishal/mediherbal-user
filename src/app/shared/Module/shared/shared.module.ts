import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
})
export class SharedModule {}

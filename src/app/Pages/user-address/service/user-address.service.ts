import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../app/store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  constructor(private store: Store<fromApp.AppState>) {}
  addnewAddress(address) {}
  fetchAllAddress() {}
}

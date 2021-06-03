import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { pluck, take, tap } from 'rxjs/operators';
import * as fromApp from '../../../../app/store/app.reducer';
import * as fromAuthActions from '../../../auth/store/Auth.Actions';
@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  constructor(private store: Store<fromApp.AppState>) {}
  addnewAddress(useraddress) {
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),
        take(1),
        tap((userDeatils) => {
          let userDetails = { ...userDeatils };
          let address = userDeatils.address ? [...userDeatils.address] : [];
          address.push({
            ...useraddress,
          });
          let updatedDetails = { ...userDetails, address: [...address] };

          this.store.dispatch(
            new fromAuthActions.ChangeUserCartDeatilsStart(updatedDetails)
          );
        })
      )
      .subscribe();
  }
  fetchAllAddress() {
    return this.store
      .select('AuthSection')
      .pipe(pluck('user'), pluck('address'));
  }
  deteleUserAddress(index) {
    this.store
      .select('AuthSection')
      .pipe(
        pluck('user'),
        take(1),
        tap((userDeatils) => {
          let userDetails = { ...userDeatils };
          let address = userDeatils.address ? [...userDeatils.address] : [];
          if (address.length > 0) {
            address.splice(index, 1);
            let updatedDetails = { ...userDetails, address: [...address] };

            this.store.dispatch(
              new fromAuthActions.ChangeUserCartDeatilsStart(updatedDetails)
            );
          }
        })
      )
      .subscribe();
  }
  editUserAddressInfo(updatedAddress, index) {}
}

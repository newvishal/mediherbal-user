import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuthAction from './Auth.Actions';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}
  /*
  Login Effect
  */
  @Effect({
    dispatch: true,
  })
  AuthLogin = this.action$.pipe(
    ofType(fromAuthAction.LOGIN_START),
    switchMap((loginStartState: fromAuthAction.LoginStart) => {
      return from(
        this.angularFireAuth.signInWithEmailAndPassword(
          loginStartState.payload.email,
          loginStartState.payload.password
        )
      ).pipe(
        mergeMap((Loginresponse) => {
          return this.angularFireStore
            .collection('users', (ref) =>
              ref.where('email', '==', loginStartState.payload.email)
            )
            .snapshotChanges()
            .pipe(
              map((userObervable) => {
                return userObervable.map((userData) => {
                  const data = userData.payload.doc.data() as User;
                  const id = userData.payload.doc.id;

                  return { id: id, ...data };
                });
              })
            );
        })
      );
    }),
    map((data) => {
      const userData = { ...data[0] };

      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigate(['/home']);
      return new fromAuthAction.LoginSuccess(data[0]);
    })
  );

  /*

  SignUp Effect
  */
  @Effect({
    dispatch: true,
  })
  AuthSignUp = this.action$.pipe(
    ofType(fromAuthAction.SIGNUP_START),
    switchMap((signUpStartState: fromAuthAction.SignUpStart) => {
      return from(
        this.angularFireAuth.createUserWithEmailAndPassword(
          signUpStartState.payload.email,
          signUpStartState.payload.password
        )
      ).pipe(
        mergeMap((response) => {
          return from(
            this.angularFireStore
              .collection('users')
              .add(signUpStartState.payload)
          ).pipe(map((res) => res));
        })
      );
    }),
    map(() => {
      return new fromAuthAction.SignUpSuccess();
    })
  );
  @Effect({
    dispatch: false,
  })
  AuthSignUpSuccess = this.action$.pipe(
    ofType(fromAuthAction.SIGNUP_SUCCESS),
    tap(() => {
      this.router.navigate(['/login']);
    })
  );
  @Effect({ dispatch: true })
  ChnageCartDetails = this.action$.pipe(
    ofType(fromAuthAction.CHANGE_USER_CART_DETAILS_START),
    switchMap(
      (chnageCartDeatilsState: fromAuthAction.ChangeUserCartDeatilsStart) => {
        let userUpdatedData: User = { ...chnageCartDeatilsState.playload };
        delete userUpdatedData['id'];

        return of(
          this.angularFireStore
            .collection('users')
            .doc(chnageCartDeatilsState.playload.id)
            .update(userUpdatedData)
        ).pipe(
          mergeMap((reponse) => {
            return of({ ...chnageCartDeatilsState.playload });
          })
        );
      }
    ),
    map((updatedUserState: any) => {
      return new fromAuthAction.ChangeUserCartDeatilsSuccess(updatedUserState);
    })
  );
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuthAction from './Auth.Actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {}
  AuthLogin = this.action$.pipe(ofType(fromAuthAction.LOGIN_START));
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
      new fromAuthAction.SignUpSuccess();
    })
  );
}

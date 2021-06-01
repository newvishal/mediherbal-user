import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuthAction from '../app/auth/store/Auth.Actions';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private angularFireStore: AngularFirestore
  ) {}
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.angularFireStore
        .collection('users', (ref) => ref.where('email', '==', userData.email))
        .snapshotChanges()
        .pipe(
          take(1),
          map((usersDataObervable) => {
            return usersDataObervable.map((userDetails) => {
              const data = userDetails.payload.doc.data() as any;
              const id = userDetails.payload.doc.id;

              return { id: id, ...data };
            });
          }),
          tap((finalUserData: any) => {
            this.store.dispatch(
              new fromAuthAction.LoginSuccess(finalUserData[0])
            );
          })
        )
        .subscribe();
    } else {
      this.router.navigate(['/login']);
    }
  }
  title = 'mediherbal';
}

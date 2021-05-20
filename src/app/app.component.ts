import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuthAction from '../app/auth/store/Auth.Actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.store.dispatch(new fromAuthAction.LoginSuccess(userData));
    } else {
      this.router.navigate(['/login']);
    }
  }
  title = 'mediherbal';
}

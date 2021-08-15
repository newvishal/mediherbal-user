import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuthAction from '../app/auth/store/Auth.Actions';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';
import { UserDataService } from './shared/service/userData.service';
import { AuthService } from './auth/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private auth: AuthService
  ) {}
  userData = null;
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.userDataService.setUserData(this.userData);
      this.auth.active_user.next(this.userData);
    }
    this.auth.active_user.subscribe((res) => {
      this.userData = res;
    });
  }
  title = 'mediherbal';
}

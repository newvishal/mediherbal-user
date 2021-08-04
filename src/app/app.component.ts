import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuthAction from '../app/auth/store/Auth.Actions';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';
import { UserDataService } from './shared/service/userData.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.userDataService.setUserData(userData);
    }
  }
  title = 'mediherbal';
}

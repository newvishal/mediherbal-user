import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private auth: AuthService) {}
  UserData = new BehaviorSubject<any>(null);
  setUserData(userData) {
    this.UserData.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }
  logout() {
    localStorage.removeItem('userData');
    this.auth.active_user.next(null);
    this.UserData.next(null);
  }
}

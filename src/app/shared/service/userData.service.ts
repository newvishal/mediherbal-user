import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}
  UserData = new BehaviorSubject<any>(null);
  setUserData(userData) {
    this.UserData.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }
  logout() {
    this.UserData.next(null);
    localStorage.removeItem('userData');
  }
}

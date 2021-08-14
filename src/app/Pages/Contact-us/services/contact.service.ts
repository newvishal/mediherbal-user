import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../../store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  httpClient: HttpClient;
  constructor(private httpbackEnd: HttpBackend) {
    this.httpClient = new HttpClient(httpbackEnd);
  }
  addUsersAddress(data) {
    return this.httpClient.post<{
      status: boolean;
      message: string;
      data: any;
    }>(`${environment.base_url}contact`, data);
  }
}

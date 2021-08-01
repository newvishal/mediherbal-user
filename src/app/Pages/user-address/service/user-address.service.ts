import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  constructor(private http: HttpClient) {}
  addnewAddress(useraddress) {
    return this.http.post<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user/address/add-address`,
      useraddress
    );
  }
  fetchAllAddress() {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user/address/fetch-address`
    );
  }
  deteleUserAddress(id) {
    return this.http.delete<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user/address/delete-address/${id}`
    );
  }
  editUserAddressInfo(updatedAddress, id) {
    return this.http.patch<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user/address/edit-address/${id}`,
      updatedAddress
    );
  }
}

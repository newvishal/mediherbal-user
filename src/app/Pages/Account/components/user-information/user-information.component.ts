import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { UserDataService } from 'src/app/shared/service/userData.service';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit {
  userData;
  userId;
  imageLoader = false;
  first_name: FormControl;
  last_name: FormControl;
  phone_number: FormControl;
  email: FormControl;
  constructor(
    private userDataService: UserDataService,
    private accountService: AccountService,
    private SnakbarService: SnakbarService,
    private angularfireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.userId = this.userDataService.getUserData()._id;
    this.getUserDetail();
  }
  getUserDetail() {
    this.accountService.getProfileDetail(this.userId).subscribe(
      (user) => {
        this.userData = user.data;
        this.first_name = new FormControl(this.userData.first_name, [
          Validators.required,
        ]);
        this.last_name = new FormControl(this.userData.last_name, [
          Validators.required,
        ]);
        this.email = new FormControl(this.userData.email, [
          Validators.required,
          Validators.email,
        ]);
        this.phone_number = new FormControl(this.userData.phone_number, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveChanges(property) {
    if (property === 'first_name') {
      if (this.first_name.valid) {
        this.accountService
          .editProfileDetail({ first_name: this.first_name.value })
          .subscribe(
            (data) => {
              this.SnakbarService.showSnackBar(
                'First Name Updated successfully !!',
                'success'
              );
            },
            (err) => {
              this.SnakbarService.showSnackBar(
                'Something went wrong !!',
                'danger'
              );
            }
          );
      }
    }
    if (property === 'last_name') {
      if (this.last_name.valid) {
        this.accountService
          .editProfileDetail({ last_name: this.last_name.value })
          .subscribe(
            (data) => {
              this.SnakbarService.showSnackBar(
                'last Name Updated successfully !!',
                'success'
              );
            },
            (err) => {
              this.SnakbarService.showSnackBar(
                'Something went wrong !!',
                'danger'
              );
            }
          );
      }
    }
    if (property === 'email') {
      if (this.email.valid) {
        this.accountService
          .editProfileDetail({ email: this.email.value })
          .subscribe(
            (data) => {
              this.SnakbarService.showSnackBar(
                'Email Updated successfully !!',
                'success'
              );
            },
            (err) => {
              this.SnakbarService.showSnackBar(
                'Something went wrong !!',
                'danger'
              );
            }
          );
      }
    }
    if (property === 'phone_number') {
      if (this.phone_number.valid) {
        this.accountService
          .editProfileDetail({ phone_number: this.phone_number.value })
          .subscribe(
            (data) => {
              this.SnakbarService.showSnackBar(
                'Phone number Updated successfully !!',
                'success'
              );
            },
            (err) => {
              this.SnakbarService.showSnackBar(
                'Something went wrong !!',
                'danger'
              );
            }
          );
      }
    }
  }
  ImageSelected(event) {
    this.imageLoader = true;
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const filePaths = `user_profile/${this.userId}/${this.userData.first_name}/${this.userData.last_name}`;
      const filePath = filePaths.toString().replace('%2', '/');
      const fileRef = this.angularfireStorage.ref(filePath);
      const task = this.angularfireStorage.ref(filePath).put(file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let downloadURL = fileRef.getDownloadURL();
            downloadURL.subscribe(
              (res: string) => {
                this.accountService
                  .editProfileDetail({ user_image: res })
                  .subscribe(
                    (response: any) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      this.userData.user_image = res;
                      this.SnakbarService.showSnackBar(
                        'Image Updated successfully !!',
                        'success'
                      );

                      this.getUserDetail();
                      this.imageLoader = false;
                    },
                    (err) => {
                      this.SnakbarService.showSnackBar(
                        'Something went wrong !!',
                        'danger'
                      );
                      this.imageLoader = false;
                    }
                  );
              },
              (err) => {
                this.imageLoader = false;
              }
            );
          })
        )
        .subscribe();
    }
  }
}

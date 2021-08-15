import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editInformation() {}
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

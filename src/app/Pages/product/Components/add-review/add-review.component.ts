import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnakbarService } from 'src/app/shared/Service/snakBar.service';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  id;
  @Input() productType;
  constructor(
    private productService: ProductService,
    private snackbar: SnakbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res.id) {
        this.id = res.id;
      }
      if (res.type === 'single') {
        this.productType = 'single';
      }
      if (res.type === 'combo') {
        this.productType = 'combo';
      }
    });
    this.reviewForm = new FormGroup({
      review_comments: new FormControl('', [Validators.required]),
      review_points: new FormControl('', [Validators.required]),
    });
  }
  changeStarValue(star) {
    this.reviewForm.get('review_points').setValue(star + 1);
  }
  saveReview() {
    if (this.productType === 'single') {
      this.productService
        .addProductReview(this.reviewForm.value, this.id)
        .subscribe(
          (response) => {
            this.snackbar.showSnackBar(response.message, 'success');
            this.productService.refreshData.emit();
          },
          (err) => {
            this.snackbar.showSnackBar('Something Went wrong', 'danger');
          }
        );
    } else if (this.productType === 'combo') {
      this.productService
        .addComboProductReview(this.reviewForm.value, this.id)
        .subscribe(
          (response) => {
            this.snackbar.showSnackBar(response.message, 'success');
            this.productService.refreshData.emit();
          },
          (err) => {
            this.snackbar.showSnackBar('Something Went wrong', 'danger');
          }
        );
    }
  }
}

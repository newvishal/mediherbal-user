import { Injectable } from '@angular/core';
import { HomeService } from '../../home/service/home.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private homeService: HomeService) {}
  getComboProductById(id) {}
  getProductById(id) {}
}

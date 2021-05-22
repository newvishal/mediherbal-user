import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboProductSliderComponent } from './combo-product-slider.component';

describe('ComboProductSliderComponent', () => {
  let component: ComboProductSliderComponent;
  let fixture: ComponentFixture<ComboProductSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboProductSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswwordComponent } from './forgot-passwword.component';

describe('ForgotPasswwordComponent', () => {
  let component: ForgotPasswwordComponent;
  let fixture: ComponentFixture<ForgotPasswwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

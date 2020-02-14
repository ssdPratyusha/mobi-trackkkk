import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponentComponent } from './forgot-password-component.component';

describe('ForgotPasswordComponentComponent', () => {
  let component: ForgotPasswordComponentComponent;
  let fixture: ComponentFixture<ForgotPasswordComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

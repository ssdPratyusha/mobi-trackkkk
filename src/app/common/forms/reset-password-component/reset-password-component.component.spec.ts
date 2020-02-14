import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponentComponent } from './reset-password-component.component';

describe('ResetPasswordComponentComponent', () => {
  let component: ResetPasswordComponentComponent;
  let fixture: ComponentFixture<ResetPasswordComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

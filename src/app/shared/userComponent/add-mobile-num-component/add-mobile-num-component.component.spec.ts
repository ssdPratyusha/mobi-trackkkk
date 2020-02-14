import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileNumComponentComponent } from './add-mobile-num-component.component';

describe('AddMobileNumComponentComponent', () => {
  let component: AddMobileNumComponentComponent;
  let fixture: ComponentFixture<AddMobileNumComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMobileNumComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMobileNumComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

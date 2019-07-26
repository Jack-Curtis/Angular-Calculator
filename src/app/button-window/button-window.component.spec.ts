import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWindowComponent } from './button-window.component';

describe('ButtonWindowComponent', () => {
  let component: ButtonWindowComponent;
  let fixture: ComponentFixture<ButtonWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

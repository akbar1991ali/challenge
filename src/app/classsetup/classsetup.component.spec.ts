import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasssetupComponent } from './classsetup.component';

describe('ClasssetupComponent', () => {
  let component: ClasssetupComponent;
  let fixture: ComponentFixture<ClasssetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasssetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasssetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

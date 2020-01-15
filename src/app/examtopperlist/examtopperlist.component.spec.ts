import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamtopperlistComponent } from './examtopperlist.component';

describe('ExamtopperlistComponent', () => {
  let component: ExamtopperlistComponent;
  let fixture: ComponentFixture<ExamtopperlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamtopperlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamtopperlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

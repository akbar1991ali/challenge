import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTitleSetupComponent } from './exam-title-setup.component';

describe('ExamTitleSetupComponent', () => {
  let component: ExamTitleSetupComponent;
  let fixture: ComponentFixture<ExamTitleSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTitleSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTitleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

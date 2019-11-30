import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsetupweeklyComponent } from './questionsetupweekly.component';

describe('QuestionsetupweeklyComponent', () => {
  let component: QuestionsetupweeklyComponent;
  let fixture: ComponentFixture<QuestionsetupweeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsetupweeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetupweeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

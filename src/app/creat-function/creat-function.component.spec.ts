import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatFunctionComponent } from './creat-function.component';

describe('CreatFunctionComponent', () => {
  let component: CreatFunctionComponent;
  let fixture: ComponentFixture<CreatFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopictestComponent } from './topictest.component';

describe('TopictestComponent', () => {
  let component: TopictestComponent;
  let fixture: ComponentFixture<TopictestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopictestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

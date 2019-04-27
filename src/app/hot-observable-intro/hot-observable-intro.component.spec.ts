import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotObservableIntroComponent } from './hot-observable-intro.component';

describe('HotObservableIntroComponent', () => {
  let component: HotObservableIntroComponent;
  let fixture: ComponentFixture<HotObservableIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotObservableIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotObservableIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

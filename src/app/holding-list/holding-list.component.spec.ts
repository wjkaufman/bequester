import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingListComponent } from './holding-list.component';

describe('HoldingListComponent', () => {
  let component: HoldingListComponent;
  let fixture: ComponentFixture<HoldingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

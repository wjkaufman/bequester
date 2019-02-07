import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BequestComponent } from './bequest.component';

describe('BequestComponent', () => {
  let component: BequestComponent;
  let fixture: ComponentFixture<BequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

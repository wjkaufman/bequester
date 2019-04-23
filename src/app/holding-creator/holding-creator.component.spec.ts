import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingCreatorComponent } from './holding-creator.component';

describe('HoldingCreatorComponent', () => {
  let component: HoldingCreatorComponent;
  let fixture: ComponentFixture<HoldingCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

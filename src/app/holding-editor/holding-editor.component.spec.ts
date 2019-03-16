import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingEditorComponent } from './holding-editor.component';

describe('HoldingEditorComponent', () => {
  let component: HoldingEditorComponent;
  let fixture: ComponentFixture<HoldingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

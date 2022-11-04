import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rpt1Component } from './rpt1.component';

describe('Rpt1Component', () => {
  let component: Rpt1Component;
  let fixture: ComponentFixture<Rpt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rpt1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rpt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

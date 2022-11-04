import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rpt2Component } from './rpt2.component';

describe('Rpt2Component', () => {
  let component: Rpt2Component;
  let fixture: ComponentFixture<Rpt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rpt2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rpt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

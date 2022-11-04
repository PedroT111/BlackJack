import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rpt3Component } from './rpt3.component';

describe('Rpt3Component', () => {
  let component: Rpt3Component;
  let fixture: ComponentFixture<Rpt3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rpt3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rpt3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

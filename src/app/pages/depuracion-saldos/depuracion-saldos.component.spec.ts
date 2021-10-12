import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepuracionSaldosComponent } from './depuracion-saldos.component';

describe('DepuracionSaldosComponent', () => {
  let component: DepuracionSaldosComponent;
  let fixture: ComponentFixture<DepuracionSaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepuracionSaldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepuracionSaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

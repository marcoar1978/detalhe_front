import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFechamentoComponent } from './confirm-fechamento.component';

describe('ConfirmFechamentoComponent', () => {
  let component: ConfirmFechamentoComponent;
  let fixture: ComponentFixture<ConfirmFechamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmFechamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFechamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFechamentosComponent } from './consulta-fechamentos.component';

describe('ConsultaFechamentosComponent', () => {
  let component: ConsultaFechamentosComponent;
  let fixture: ComponentFixture<ConsultaFechamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaFechamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFechamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

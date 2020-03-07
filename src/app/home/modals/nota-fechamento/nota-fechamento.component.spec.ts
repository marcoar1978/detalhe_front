import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaFechamentoComponent } from './nota-fechamento.component';

describe('NotaFechamentoComponent', () => {
  let component: NotaFechamentoComponent;
  let fixture: ComponentFixture<NotaFechamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaFechamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaFechamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEmProcessoComponent } from './pedidos-em-processo.component';

describe('PedidosEmProcessoComponent', () => {
  let component: PedidosEmProcessoComponent;
  let fixture: ComponentFixture<PedidosEmProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosEmProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosEmProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

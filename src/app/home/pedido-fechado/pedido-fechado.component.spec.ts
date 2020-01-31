import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFechadoComponent } from './pedido-fechado.component';

describe('PedidoFechadoComponent', () => {
  let component: PedidoFechadoComponent;
  let fixture: ComponentFixture<PedidoFechadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoFechadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoFechadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

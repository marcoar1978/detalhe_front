import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPedidoConsComponent } from './modal-pedido-cons.component';

describe('ModalPedidoConsComponent', () => {
  let component: ModalPedidoConsComponent;
  let fixture: ComponentFixture<ModalPedidoConsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPedidoConsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPedidoConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirpedidoComponent } from './abrirpedido.component';

describe('AbrirpedidoComponent', () => {
  let component: AbrirpedidoComponent;
  let fixture: ComponentFixture<AbrirpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

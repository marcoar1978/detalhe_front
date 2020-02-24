import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressaoPedidosComponent } from './impressao-pedidos.component';

describe('ImpressaoPedidosComponent', () => {
  let component: ImpressaoPedidosComponent;
  let fixture: ComponentFixture<ImpressaoPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressaoPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

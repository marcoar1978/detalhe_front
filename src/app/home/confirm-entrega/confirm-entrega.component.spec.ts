import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEntregaComponent } from './confirm-entrega.component';

describe('ConfirmEntregaComponent', () => {
  let component: ConfirmEntregaComponent;
  let fixture: ComponentFixture<ConfirmEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEntregaComponent } from './nota-entrega.component';

describe('NotaEntregaComponent', () => {
  let component: NotaEntregaComponent;
  let fixture: ComponentFixture<NotaEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

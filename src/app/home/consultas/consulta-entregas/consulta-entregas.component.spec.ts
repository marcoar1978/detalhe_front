import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEntregasComponent } from './consulta-entregas.component';

describe('ConsultaEntregasComponent', () => {
  let component: ConsultaEntregasComponent;
  let fixture: ComponentFixture<ConsultaEntregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEntregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

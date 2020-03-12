import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadClinicaComponent } from './cad-clinica.component';

describe('CadClinicaComponent', () => {
  let component: CadClinicaComponent;
  let fixture: ComponentFixture<CadClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

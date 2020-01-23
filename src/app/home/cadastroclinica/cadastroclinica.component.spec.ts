import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroclinicaComponent } from './cadastroclinica.component';

describe('CadastroclinicaComponent', () => {
  let component: CadastroclinicaComponent;
  let fixture: ComponentFixture<CadastroclinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroclinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

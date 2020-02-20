import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechamentosComponent } from './fechamentos.component';

describe('FechamentosComponent', () => {
  let component: FechamentosComponent;
  let fixture: ComponentFixture<FechamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

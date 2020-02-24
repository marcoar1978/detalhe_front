import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioHomeComponent } from './inicio-home.component';

describe('InicioHomeComponent', () => {
  let component: InicioHomeComponent;
  let fixture: ComponentFixture<InicioHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

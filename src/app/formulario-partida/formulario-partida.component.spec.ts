import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPartidaComponent } from './formulario-partida.component';

describe('FormularioPartidaComponent', () => {
  let component: FormularioPartidaComponent;
  let fixture: ComponentFixture<FormularioPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPartidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

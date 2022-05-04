import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyEtatMensuelComponent} from './modify-etat-mensuel.component';

describe('ModifyEtatMensuelComponent', () => {
  let component: ModifyEtatMensuelComponent;
  let fixture: ComponentFixture<ModifyEtatMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyEtatMensuelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEtatMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

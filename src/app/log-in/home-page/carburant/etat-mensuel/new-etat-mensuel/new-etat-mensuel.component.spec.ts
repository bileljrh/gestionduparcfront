import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewEtatMensuelComponent} from './new-etat-mensuel.component';

describe('NewEtatMensuelComponent', () => {
  let component: NewEtatMensuelComponent;
  let fixture: ComponentFixture<NewEtatMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewEtatMensuelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEtatMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

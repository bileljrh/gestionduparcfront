import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteEtatMensuelComponent} from './delete-etat-mensuel.component';

describe('DeleteEtatMensuelComponent', () => {
  let component: DeleteEtatMensuelComponent;
  let fixture: ComponentFixture<DeleteEtatMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEtatMensuelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEtatMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

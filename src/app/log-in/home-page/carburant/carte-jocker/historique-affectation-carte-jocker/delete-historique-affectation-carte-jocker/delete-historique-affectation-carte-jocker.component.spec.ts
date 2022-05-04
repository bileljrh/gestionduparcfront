import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueAffectationCarteJockerComponent} from './delete-historique-affectation-carte-jocker.component';

describe('DeleteHistoriqueAffectationCarteJockerComponent', () => {
  let component: DeleteHistoriqueAffectationCarteJockerComponent;
  let fixture: ComponentFixture<DeleteHistoriqueAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDemandeDesaffectationCarteJockerComponent} from './delete-demande-desaffectation-carte-jocker.component';

describe('DeleteDemandeDesaffectationCarteJockerComponent', () => {
  let component: DeleteDemandeDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<DeleteDemandeDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDemandeDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandeDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

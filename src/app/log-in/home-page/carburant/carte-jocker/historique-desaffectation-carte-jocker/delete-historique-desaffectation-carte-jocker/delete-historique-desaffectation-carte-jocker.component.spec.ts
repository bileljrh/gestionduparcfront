import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueDesaffectationCarteJockerComponent} from './delete-historique-desaffectation-carte-jocker.component';

describe('DeleteHistoriqueDesaffectationCarteJockerComponent', () => {
  let component: DeleteHistoriqueDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<DeleteHistoriqueDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

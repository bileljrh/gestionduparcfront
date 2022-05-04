import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueAnnulationCarteAgilisCashComponent} from './delete-historique-annulation-carte-agilis-cash.component';

describe('DeleteHistoriqueAnnulationCarteAgilisCashComponent', () => {
  let component: DeleteHistoriqueAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteHistoriqueAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

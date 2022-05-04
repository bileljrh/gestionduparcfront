import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAnnulationCarteAgilisCashComponent} from './delete-annulation-carte-agilis-cash.component';

describe('DeleteAnnulationCarteAgilisCashComponent', () => {
  let component: DeleteAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

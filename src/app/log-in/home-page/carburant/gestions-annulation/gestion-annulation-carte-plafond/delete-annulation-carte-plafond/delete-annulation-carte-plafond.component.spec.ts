import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAnnulationCartePlafondComponent} from './delete-annulation-carte-plafond.component';

describe('DeleteAnnulationCartePlafondComponent', () => {
  let component: DeleteAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<DeleteAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

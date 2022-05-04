import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadVehiculeDocumentComponent} from './read-vehicule-document.component';

describe('ReadVehiculeDocumentComponent', () => {
  let component: ReadVehiculeDocumentComponent;
  let fixture: ComponentFixture<ReadVehiculeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadVehiculeDocumentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadVehiculeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

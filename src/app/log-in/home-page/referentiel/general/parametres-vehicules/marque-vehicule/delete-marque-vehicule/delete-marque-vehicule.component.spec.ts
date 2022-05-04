import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteMarqueVehiculeComponent} from './delete-marque-vehicule.component';

describe('DeleteMarqueVehiculeComponent', () => {
  let component: DeleteMarqueVehiculeComponent;
  let fixture: ComponentFixture<DeleteMarqueVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMarqueVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMarqueVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

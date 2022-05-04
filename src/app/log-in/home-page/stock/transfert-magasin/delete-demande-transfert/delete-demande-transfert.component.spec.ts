import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDemandeTransfertComponent } from './delete-demande-transfert.component';

describe('DeleteDemandeTransfertComponent', () => {
  let component: DeleteDemandeTransfertComponent;
  let fixture: ComponentFixture<DeleteDemandeTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDemandeTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandeTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceptionFournisseurComponent } from './delete-reception-fournisseur.component';

describe('DeleteReceptionFournisseurComponent', () => {
  let component: DeleteReceptionFournisseurComponent;
  let fixture: ComponentFixture<DeleteReceptionFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReceptionFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReceptionFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

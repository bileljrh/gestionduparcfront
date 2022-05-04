import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAnneeComponent} from './delete-annee.component';

describe('DeleteAnneeComponent', () => {
  let component: DeleteAnneeComponent;
  let fixture: ComponentFixture<DeleteAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAnneeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

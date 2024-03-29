import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteFournisseurComponent} from './delete-fournisseur.component';

describe('DeleteFournisseurComponent', () => {
  let component: DeleteFournisseurComponent;
  let fixture: ComponentFixture<DeleteFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFournisseurComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

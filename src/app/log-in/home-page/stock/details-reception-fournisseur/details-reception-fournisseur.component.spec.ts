import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsReceptionFournisseurComponent} from './details-reception-fournisseur.component';

describe('DetailsReceptionFournisseurComponent', () => {
  let component: DetailsReceptionFournisseurComponent;
  let fixture: ComponentFixture<DetailsReceptionFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsReceptionFournisseurComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReceptionFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationReceptionFournisseurComponent} from './modification-reception-fournisseur.component';

describe('ModificationReceptionFournisseurComponent', () => {
  let component: ModificationReceptionFournisseurComponent;
  let fixture: ComponentFixture<ModificationReceptionFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificationReceptionFournisseurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationReceptionFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

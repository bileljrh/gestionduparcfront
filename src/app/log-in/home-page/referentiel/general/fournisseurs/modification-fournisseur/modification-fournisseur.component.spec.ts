import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationFournisseurComponent} from './modification-fournisseur.component';

describe('ModificationFournisseurComponent', () => {
  let component: ModificationFournisseurComponent;
  let fixture: ComponentFixture<ModificationFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationFournisseurComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

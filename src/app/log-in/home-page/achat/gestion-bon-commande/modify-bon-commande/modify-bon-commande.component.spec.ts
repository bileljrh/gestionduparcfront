import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyBonCommandeComponent} from './modify-bon-commande.component';

describe('ModifyBonCommandeComponent', () => {
  let component: ModifyBonCommandeComponent;
  let fixture: ComponentFixture<ModifyBonCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyBonCommandeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

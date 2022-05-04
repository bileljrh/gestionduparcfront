import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UniteGestionParcComponent} from './unite-gestion-parc.component';

describe('UniteGestionParcComponent', () => {
  let component: UniteGestionParcComponent;
  let fixture: ComponentFixture<UniteGestionParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniteGestionParcComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteGestionParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

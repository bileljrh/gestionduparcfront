import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewBonCommandeComponent} from './new-bon-commande.component';

describe('NewBonCommandeComponent', () => {
  let component: NewBonCommandeComponent;
  let fixture: ComponentFixture<NewBonCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewBonCommandeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

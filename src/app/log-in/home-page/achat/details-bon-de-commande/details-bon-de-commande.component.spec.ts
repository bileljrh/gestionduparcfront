import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsBonDeCommandeComponent} from './details-bon-de-commande.component';

describe('DetailsBonDeCommandeComponent', () => {
  let component: DetailsBonDeCommandeComponent;
  let fixture: ComponentFixture<DetailsBonDeCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsBonDeCommandeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonDeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationPerteCartePlafondComponent} from './declaration-perte-carte-plafond.component';

describe('DeclarationPerteCartePlafondComponent', () => {
  let component: DeclarationPerteCartePlafondComponent;
  let fixture: ComponentFixture<DeclarationPerteCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationPerteCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationPerteCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

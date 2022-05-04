import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarationPerteCarteAgilisCashComponent} from './declaration-perte-carte-agilis-cash.component';

describe('DeclarationPerteCarteAgilisCashComponent', () => {
  let component: DeclarationPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeclarationPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

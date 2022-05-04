import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewDeclarationPerteCarteAgilisCashComponent} from './new-declaration-perte-carte-agilis-cash.component';

describe('NewDeclarationPerteCarteAgilisCashComponent', () => {
  let component: NewDeclarationPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<NewDeclarationPerteCarteAgilisCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDeclarationPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeclarationPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

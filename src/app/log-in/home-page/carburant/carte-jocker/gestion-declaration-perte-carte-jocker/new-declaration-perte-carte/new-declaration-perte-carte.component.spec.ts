import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeclarationPerteCarteComponent } from './new-declaration-perte-carte.component';

describe('NewDeclarationPerteCarteComponent', () => {
  let component: NewDeclarationPerteCarteComponent;
  let fixture: ComponentFixture<NewDeclarationPerteCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDeclarationPerteCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeclarationPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

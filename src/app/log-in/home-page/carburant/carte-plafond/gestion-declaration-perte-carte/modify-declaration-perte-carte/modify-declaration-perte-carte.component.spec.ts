import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDeclarationPerteCarteComponent} from './modify-declaration-perte-carte.component';

describe('ModifyDeclarationPerteCarteComponent', () => {
  let component: ModifyDeclarationPerteCarteComponent;
  let fixture: ComponentFixture<ModifyDeclarationPerteCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDeclarationPerteCarteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDeclarationPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationDeclarationPerteCarteComponent} from './confirmation-declaration-perte-carte.component';

describe('ConfirmationDeclarationPerteCarteComponent', () => {
  let component: ConfirmationDeclarationPerteCarteComponent;
  let fixture: ComponentFixture<ConfirmationDeclarationPerteCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDeclarationPerteCarteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeclarationPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

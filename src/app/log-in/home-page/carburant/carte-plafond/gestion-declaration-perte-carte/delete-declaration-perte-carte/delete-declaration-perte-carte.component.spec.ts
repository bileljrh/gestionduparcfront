import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDeclarationPerteCarteComponent} from './delete-declaration-perte-carte.component';

describe('DeleteDeclarationPerteCarteComponent', () => {
  let component: DeleteDeclarationPerteCarteComponent;
  let fixture: ComponentFixture<DeleteDeclarationPerteCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDeclarationPerteCarteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeclarationPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent} from './delete-historique-declaration-perte-carte-agilis-cash.component';

describe('DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent', () => {
  let component: DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueDeclarationPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

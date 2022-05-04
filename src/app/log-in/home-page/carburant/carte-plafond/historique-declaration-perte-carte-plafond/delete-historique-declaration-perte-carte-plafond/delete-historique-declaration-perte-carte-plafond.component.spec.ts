import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueDeclarationPerteCartePlafondComponent} from './delete-historique-declaration-perte-carte-plafond.component';

describe('DeleteHistoriqueDeclarationPerteCartePlafondComponent', () => {
  let component: DeleteHistoriqueDeclarationPerteCartePlafondComponent;
  let fixture: ComponentFixture<DeleteHistoriqueDeclarationPerteCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueDeclarationPerteCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueDeclarationPerteCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

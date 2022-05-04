import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadMoreHistoriqueDeclarationPerteCartePlafondComponent} from './read-more-historique-declaration-perte-carte-plafond.component';

describe('ReadMoreHistoriqueDeclarationPerteCartePlafondComponent', () => {
  let component: ReadMoreHistoriqueDeclarationPerteCartePlafondComponent;
  let fixture: ComponentFixture<ReadMoreHistoriqueDeclarationPerteCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreHistoriqueDeclarationPerteCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreHistoriqueDeclarationPerteCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

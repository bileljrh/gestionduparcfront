import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleVisiteTechniqueComponent} from './nouvelle-visite-technique.component';

describe('NouvelleVisiteTechniqueComponent', () => {
  let component: NouvelleVisiteTechniqueComponent;
  let fixture: ComponentFixture<NouvelleVisiteTechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouvelleVisiteTechniqueComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleVisiteTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

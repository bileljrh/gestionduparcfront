import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchTaxeCirculationComponent} from './search-taxe-circulation.component';

describe('SearchTaxeCirculationComponent', () => {
  let component: SearchTaxeCirculationComponent;
  let fixture: ComponentFixture<SearchTaxeCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTaxeCirculationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTaxeCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

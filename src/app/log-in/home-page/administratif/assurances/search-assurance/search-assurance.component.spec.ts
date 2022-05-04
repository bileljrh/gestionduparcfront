import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchAssuranceComponent} from './search-assurance.component';

describe('SearchAssuranceComponent', () => {
  let component: SearchAssuranceComponent;
  let fixture: ComponentFixture<SearchAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAssuranceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

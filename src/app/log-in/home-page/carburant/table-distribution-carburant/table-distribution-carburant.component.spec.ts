import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableDistributionCarburantComponent} from './table-distribution-carburant.component';

describe('TableDistributionCarburantComponent', () => {
  let component: TableDistributionCarburantComponent;
  let fixture: ComponentFixture<TableDistributionCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableDistributionCarburantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDistributionCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

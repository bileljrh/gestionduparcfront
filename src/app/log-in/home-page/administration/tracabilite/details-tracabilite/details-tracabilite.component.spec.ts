import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsTracabiliteComponent} from './details-tracabilite.component';

describe('DetailsTracabiliteComponent', () => {
  let component: DetailsTracabiliteComponent;
  let fixture: ComponentFixture<DetailsTracabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsTracabiliteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTracabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

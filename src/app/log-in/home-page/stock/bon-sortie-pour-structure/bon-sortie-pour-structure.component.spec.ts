import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BonSortiePourStructureComponent} from './bon-sortie-pour-structure.component';

describe('BonSortiePourStructureComponent', () => {
  let component: BonSortiePourStructureComponent;
  let fixture: ComponentFixture<BonSortiePourStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BonSortiePourStructureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonSortiePourStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

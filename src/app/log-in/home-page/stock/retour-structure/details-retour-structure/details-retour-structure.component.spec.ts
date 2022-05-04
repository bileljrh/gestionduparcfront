import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRetourStructureComponent } from './details-retour-structure.component';

describe('DetailsRetourStructureComponent', () => {
  let component: DetailsRetourStructureComponent;
  let fixture: ComponentFixture<DetailsRetourStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRetourStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRetourStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

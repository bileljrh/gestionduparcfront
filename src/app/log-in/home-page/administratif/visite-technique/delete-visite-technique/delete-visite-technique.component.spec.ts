import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteVisiteTechniqueComponent} from './delete-visite-technique.component';

describe('DeleteVisiteTechniqueComponent', () => {
  let component: DeleteVisiteTechniqueComponent;
  let fixture: ComponentFixture<DeleteVisiteTechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteVisiteTechniqueComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVisiteTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

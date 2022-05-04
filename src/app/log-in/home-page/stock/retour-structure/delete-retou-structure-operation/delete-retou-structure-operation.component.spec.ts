import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRetouStructureOperationComponent } from './delete-retou-structure-operation.component';

describe('DeleteRetouStructureOperationComponent', () => {
  let component: DeleteRetouStructureOperationComponent;
  let fixture: ComponentFixture<DeleteRetouStructureOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRetouStructureOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRetouStructureOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

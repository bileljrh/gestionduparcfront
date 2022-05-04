import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAssuranceComponent} from './delete-assurance.component';

describe('DeleteAssuranceComponent', () => {
  let component: DeleteAssuranceComponent;
  let fixture: ComponentFixture<DeleteAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAssuranceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

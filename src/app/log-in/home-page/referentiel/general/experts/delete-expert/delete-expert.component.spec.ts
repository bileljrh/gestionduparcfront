import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteExpertComponent} from './delete-expert.component';

describe('DeleteExpertComponent', () => {
  let component: DeleteExpertComponent;
  let fixture: ComponentFixture<DeleteExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteExpertComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

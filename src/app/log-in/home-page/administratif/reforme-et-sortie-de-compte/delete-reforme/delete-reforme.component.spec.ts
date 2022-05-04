import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteReformeComponent} from './delete-reforme.component';

describe('DeleteReformeComponent', () => {
  let component: DeleteReformeComponent;
  let fixture: ComponentFixture<DeleteReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteReformeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

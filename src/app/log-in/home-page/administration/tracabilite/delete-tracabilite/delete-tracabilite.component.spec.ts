import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteTracabiliteComponent} from './delete-tracabilite.component';

describe('DeleteTracabiliteComponent', () => {
  let component: DeleteTracabiliteComponent;
  let fixture: ComponentFixture<DeleteTracabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTracabiliteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTracabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

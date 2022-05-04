import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAlerteComponent} from './delete-alerte.component';

describe('DeleteAlerteComponent', () => {
  let component: DeleteAlerteComponent;
  let fixture: ComponentFixture<DeleteAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAlerteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePerteCarteComponent } from './delete-perte-carte.component';

describe('DeletePerteCarteComponent', () => {
  let component: DeletePerteCarteComponent;
  let fixture: ComponentFixture<DeletePerteCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePerteCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

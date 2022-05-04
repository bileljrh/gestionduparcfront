import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteUniteComponent} from './delete-unite.component';

describe('DeleteUniteComponent', () => {
  let component: DeleteUniteComponent;
  let fixture: ComponentFixture<DeleteUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUniteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

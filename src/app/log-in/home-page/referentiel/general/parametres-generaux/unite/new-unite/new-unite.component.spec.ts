import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewUniteComponent} from './new-unite.component';

describe('NewUniteComponent', () => {
  let component: NewUniteComponent;
  let fixture: ComponentFixture<NewUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUniteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

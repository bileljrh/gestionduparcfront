import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewGouvernoratComponent} from './new-gouvernorat.component';

describe('NewGouvernoratComponent', () => {
  let component: NewGouvernoratComponent;
  let fixture: ComponentFixture<NewGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGouvernoratComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

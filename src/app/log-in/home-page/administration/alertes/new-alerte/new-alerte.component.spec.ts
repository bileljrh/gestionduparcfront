import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAlerteComponent} from './new-alerte.component';

describe('NewAlerteComponent', () => {
  let component: NewAlerteComponent;
  let fixture: ComponentFixture<NewAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAlerteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

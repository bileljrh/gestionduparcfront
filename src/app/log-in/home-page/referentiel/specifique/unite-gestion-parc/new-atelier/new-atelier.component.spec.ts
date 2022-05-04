import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAtelierComponent} from './new-atelier.component';

describe('NewAtelierComponent', () => {
  let component: NewAtelierComponent;
  let fixture: ComponentFixture<NewAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAtelierComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

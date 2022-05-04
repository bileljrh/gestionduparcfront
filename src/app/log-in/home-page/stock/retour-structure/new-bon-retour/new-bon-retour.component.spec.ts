import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBonRetourComponent } from './new-bon-retour.component';

describe('NewBonRetourComponent', () => {
  let component: NewBonRetourComponent;
  let fixture: ComponentFixture<NewBonRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBonRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBonRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyGPSComponent} from './modify-gps.component';

describe('ModifyGPSComponent', () => {
  let component: ModifyGPSComponent;
  let fixture: ComponentFixture<ModifyGPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyGPSComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

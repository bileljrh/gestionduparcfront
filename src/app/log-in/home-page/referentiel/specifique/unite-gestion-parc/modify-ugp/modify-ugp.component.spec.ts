import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyUGPComponent} from './modify-ugp.component';

describe('ModifyUGPComponent', () => {
  let component: ModifyUGPComponent;
  let fixture: ComponentFixture<ModifyUGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyUGPComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

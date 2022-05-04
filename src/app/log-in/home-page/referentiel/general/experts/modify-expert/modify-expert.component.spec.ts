import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyExpertComponent} from './modify-expert.component';

describe('ModifyExpertComponent', () => {
  let component: ModifyExpertComponent;
  let fixture: ComponentFixture<ModifyExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyExpertComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

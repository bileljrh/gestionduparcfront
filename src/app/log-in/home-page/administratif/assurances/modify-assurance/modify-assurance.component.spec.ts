import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyAssuranceComponent} from './modify-assurance.component';

describe('ModifyAssuranceComponent', () => {
  let component: ModifyAssuranceComponent;
  let fixture: ComponentFixture<ModifyAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyAssuranceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

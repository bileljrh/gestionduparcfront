import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyGouvernoratComponent} from './modify-gouvernorat.component';

describe('ModifyGouvernoratComponent', () => {
  let component: ModifyGouvernoratComponent;
  let fixture: ComponentFixture<ModifyGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyGouvernoratComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

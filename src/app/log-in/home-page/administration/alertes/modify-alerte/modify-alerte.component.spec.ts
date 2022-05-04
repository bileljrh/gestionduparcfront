import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyAlerteComponent} from './modify-alerte.component';

describe('ModifyAlerteComponent', () => {
  let component: ModifyAlerteComponent;
  let fixture: ComponentFixture<ModifyAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyAlerteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

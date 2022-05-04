import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyMagasinComponent} from './modify-magasin.component';

describe('ModifyMagasinComponent', () => {
  let component: ModifyMagasinComponent;
  let fixture: ComponentFixture<ModifyMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyMagasinComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

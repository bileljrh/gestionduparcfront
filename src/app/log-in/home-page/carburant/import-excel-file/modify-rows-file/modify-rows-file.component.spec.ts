import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';

import { ModifyRowsFileComponent } from './modify-rows-file.component';

describe('ModifyRowsFileComponent', () => {
  let component: ModifyRowsFileComponent;
  let fixture: ComponentFixture<ModifyRowsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule],
      declarations: [ModifyRowsFileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRowsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

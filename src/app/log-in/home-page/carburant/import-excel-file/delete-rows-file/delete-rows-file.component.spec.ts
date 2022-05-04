import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRowsFileComponent } from './delete-rows-file.component';

describe('DeleteRowsFileComponent', () => {
  let component: DeleteRowsFileComponent;
  let fixture: ComponentFixture<DeleteRowsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRowsFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRowsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

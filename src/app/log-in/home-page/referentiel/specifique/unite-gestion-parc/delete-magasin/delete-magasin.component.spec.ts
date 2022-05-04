import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteMagasinComponent} from './delete-magasin.component';

describe('DeleteMagasinComponent', () => {
  let component: DeleteMagasinComponent;
  let fixture: ComponentFixture<DeleteMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteMagasinComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

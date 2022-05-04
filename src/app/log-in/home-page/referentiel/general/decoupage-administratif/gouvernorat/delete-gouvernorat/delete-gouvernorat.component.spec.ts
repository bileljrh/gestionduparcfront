import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteGouvernoratComponent} from './delete-gouvernorat.component';

describe('DeleteGouvernoratComponent', () => {
  let component: DeleteGouvernoratComponent;
  let fixture: ComponentFixture<DeleteGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteGouvernoratComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

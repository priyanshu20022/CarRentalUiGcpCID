import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDatesComponent } from './edit-dates.component';

describe('EditDatesComponent', () => {
  let component: EditDatesComponent;
  let fixture: ComponentFixture<EditDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDatesComponent]
    });
    fixture = TestBed.createComponent(EditDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

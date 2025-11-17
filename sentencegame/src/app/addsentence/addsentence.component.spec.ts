import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsentenceComponent } from './addsentence.component';

describe('AddsentenceComponent', () => {
  let component: AddsentenceComponent;
  let fixture: ComponentFixture<AddsentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsentenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

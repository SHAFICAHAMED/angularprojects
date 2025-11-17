import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypingComponent } from './test-typing.component';

describe('TestTypingComponent', () => {
  let component: TestTypingComponent;
  let fixture: ComponentFixture<TestTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTypingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

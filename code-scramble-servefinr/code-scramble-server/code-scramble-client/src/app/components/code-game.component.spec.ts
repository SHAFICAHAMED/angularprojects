import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGameComponent } from './code-game.component';

describe('CodeGameComponent', () => {
  let component: CodeGameComponent;
  let fixture: ComponentFixture<CodeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

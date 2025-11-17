import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordscrambledComponent } from './wordscrambled.component';

describe('WordscrambledComponent', () => {
  let component: WordscrambledComponent;
  let fixture: ComponentFixture<WordscrambledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordscrambledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordscrambledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

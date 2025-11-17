import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularylistComponent } from './vocabularylist.component';

describe('VocabularylistComponent', () => {
  let component: VocabularylistComponent;
  let fixture: ComponentFixture<VocabularylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabularylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

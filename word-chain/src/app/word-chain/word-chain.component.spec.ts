import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordChainComponent } from './word-chain.component';

describe('WordChainComponent', () => {
  let component: WordChainComponent;
  let fixture: ComponentFixture<WordChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordChainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

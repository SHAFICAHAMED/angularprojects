import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainsceneComponent } from './mainscene.component';

describe('MainsceneComponent', () => {
  let component: MainsceneComponent;
  let fixture: ComponentFixture<MainsceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainsceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainsceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

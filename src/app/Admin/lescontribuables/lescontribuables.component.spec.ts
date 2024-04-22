import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LescontribuablesComponent } from './lescontribuables.component';

describe('LescontribuablesComponent', () => {
  let component: LescontribuablesComponent;
  let fixture: ComponentFixture<LescontribuablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LescontribuablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LescontribuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

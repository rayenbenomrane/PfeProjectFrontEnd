import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesObligationsComponent } from './les-obligations.component';

describe('LesObligationsComponent', () => {
  let component: LesObligationsComponent;
  let fixture: ComponentFixture<LesObligationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesObligationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LesObligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

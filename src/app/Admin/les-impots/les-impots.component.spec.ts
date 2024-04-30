import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesImpotsComponent } from './les-impots.component';

describe('LesImpotsComponent', () => {
  let component: LesImpotsComponent;
  let fixture: ComponentFixture<LesImpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesImpotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LesImpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

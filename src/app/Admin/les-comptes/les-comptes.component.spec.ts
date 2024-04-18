import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesComptesComponent } from './les-comptes.component';

describe('LesComptesComponent', () => {
  let component: LesComptesComponent;
  let fixture: ComponentFixture<LesComptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesComptesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LesComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

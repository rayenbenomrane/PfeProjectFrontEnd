import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MespaiementsComponent } from './mespaiements.component';

describe('MespaiementsComponent', () => {
  let component: MespaiementsComponent;
  let fixture: ComponentFixture<MespaiementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MespaiementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MespaiementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

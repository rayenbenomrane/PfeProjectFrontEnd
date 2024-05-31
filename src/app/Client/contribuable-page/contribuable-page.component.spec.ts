import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuablePageComponent } from './contribuable-page.component';

describe('ContribuablePageComponent', () => {
  let component: ContribuablePageComponent;
  let fixture: ComponentFixture<ContribuablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContribuablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContribuablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

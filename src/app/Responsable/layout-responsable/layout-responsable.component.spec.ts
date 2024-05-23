import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutResponsableComponent } from './layout-responsable.component';

describe('LayoutResponsableComponent', () => {
  let component: LayoutResponsableComponent;
  let fixture: ComponentFixture<LayoutResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutResponsableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

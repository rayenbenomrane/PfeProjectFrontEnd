import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImpotComponent } from './detail-impot.component';

describe('DetailImpotComponent', () => {
  let component: DetailImpotComponent;
  let fixture: ComponentFixture<DetailImpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailImpotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailImpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

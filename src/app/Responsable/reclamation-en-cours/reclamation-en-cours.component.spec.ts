import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationEnCoursComponent } from './reclamation-en-cours.component';

describe('ReclamationEnCoursComponent', () => {
  let component: ReclamationEnCoursComponent;
  let fixture: ComponentFixture<ReclamationEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationEnCoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

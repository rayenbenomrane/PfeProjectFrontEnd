import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationEnAttenteComponent } from './reclamation-en-attente.component';

describe('ReclamationEnAttenteComponent', () => {
  let component: ReclamationEnAttenteComponent;
  let fixture: ComponentFixture<ReclamationEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationEnAttenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

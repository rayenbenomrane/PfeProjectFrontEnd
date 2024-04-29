import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutclientComponent } from './layoutclient.component';

describe('LayoutclientComponent', () => {
  let component: LayoutclientComponent;
  let fixture: ComponentFixture<LayoutclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

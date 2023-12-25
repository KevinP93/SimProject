import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesimPopupComponent } from './createsim-popup.component';

describe('CreatesimPopupComponent', () => {
  let component: CreatesimPopupComponent;
  let fixture: ComponentFixture<CreatesimPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatesimPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatesimPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

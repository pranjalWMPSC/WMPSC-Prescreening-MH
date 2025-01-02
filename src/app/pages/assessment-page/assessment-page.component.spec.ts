import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPageComponent } from './assessment-page.component';

describe('AssessmentPageComponent', () => {
  let component: AssessmentPageComponent;
  let fixture: ComponentFixture<AssessmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

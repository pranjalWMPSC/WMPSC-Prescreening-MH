import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentScreenComponent } from './assessment-screen.component';

describe('AssessmentScreenComponent', () => {
  let component: AssessmentScreenComponent;
  let fixture: ComponentFixture<AssessmentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

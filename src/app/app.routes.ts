import { Routes } from '@angular/router';
import { AssessmentScreenComponent } from './pages/assessment-screen/assessment-screen.component';
import { AssessmentPageComponent } from './pages/assessment-page/assessment-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AddCandidateComponent } from './pages/add-candidate/add-candidate.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'assessment', component: AssessmentScreenComponent },
  { path: 'assessmentStart', component: AssessmentPageComponent },
  { path: 'addCandidate', component: AddCandidateComponent },
  {
    path: 'candidateList',
    loadComponent: () =>
      import('./pages/candidate-list/candidate-list.component').then(
        (m) => m.CandidateListComponent
      ),
    canActivate: [authGuard],
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('./pages/dashboard/dashboard.component').then(
  //       (m) => m.DashboardComponent
  //     ),
  //   canActivate: [authGuard],
  // },
  { path: 'thankYou', component: ThankYouComponent },
  { path: '', redirectTo: '/candidateList', pathMatch: 'full' },
];

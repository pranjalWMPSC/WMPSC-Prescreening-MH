import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'assessment',
    loadComponent: () =>
      import('./pages/assessment-screen/assessment-screen.component').then(
        (m) => m.AssessmentScreenComponent
      ),
      pathMatch: 'full'
  },
  {
    path: 'assessmentStart',
    loadComponent: () =>
      import('./pages/assessment-page/assessment-page.component').then(
        (m) => m.AssessmentPageComponent
      ),
      pathMatch: 'full'
  },
  {
    path: 'addCandidate',
    loadComponent: () =>
      import('./pages/add-candidate/add-candidate.component').then(
        (m) => m.AddCandidateComponent
      ),
      pathMatch: 'full'
  },
  {
    path: 'candidateList',
    loadComponent: () =>
      import('./pages/candidate-list/candidate-list.component').then(
        (m) => m.CandidateListComponent
      ),
    pathMatch: 'full',
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
  {
    path: 'thankYou',
    loadComponent: () =>
      import('./pages/thank-you/thank-you.component').then(
        (m) => m.ThankYouComponent
      ),
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/assessment', pathMatch: 'full' },
];

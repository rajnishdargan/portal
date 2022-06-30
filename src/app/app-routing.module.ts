import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { PlayerComponent } from './components/player/player.component';
import { QuestionsetCreateComponent } from './components/questionset-create/questionset-create.component';
import {QuestionsetEditorComponent } from './components/questionset-editor/questionset-editor.component';
import { QuestionsetDraftComponent } from './components/questionset-draft/questionset-draft.component';
import { QuestionsetWorkspaceComponent } from './components/questionset-workspace/questionset-workspace.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { QuestionsetUpForReviewComponent } from './components/questionset-up-for-review/questionset-up-for-review.component';
// tslint:disable-next-line:max-line-length
import { QuestionsetReviewSubmissionsComponent } from './components/questionset-review-submissions/questionset-review-submissions.component';
import { QuestionsetPublishedComponent } from './components/questionset-published/questionset-published.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'content-list', component: PlayerContentListComponent
  },
  {
    path: 'player/:id', component: PlayerComponent
  },
  {
    path: 'questionset', component: QuestionsetWorkspaceComponent,
    children: [
      {
        path: 'create', component: QuestionsetCreateComponent, canActivate: [AuthGuard], data: { roles: 'creator' }
      },
      {
        path: 'draft', component: QuestionsetDraftComponent, canActivate: [AuthGuard], data: { roles: 'creator' }
      },
      {
        path: 'upForReview', component: QuestionsetUpForReviewComponent, canActivate: [AuthGuard],  data: { roles: 'reviewer' }
      },
      {
        path: 'review', component: QuestionsetReviewSubmissionsComponent, canActivate: [AuthGuard],  data: { roles: 'creator' }
      },
      {
        path: 'published', component: QuestionsetPublishedComponent, canActivate: [AuthGuard],  data: { roles: 'creator' }
      }
    ]
  },
  {
    path: 'edit/questionset/:id/:status', component: QuestionsetEditorComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

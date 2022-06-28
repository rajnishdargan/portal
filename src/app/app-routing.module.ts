import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { PlayerComponent } from './components/player/player.component';
import { QuestionsetCreateComponent } from './components/questionset-create/questionset-create.component';
import {QuestionsetEditorComponent } from './components/questionset-editor/questionset-editor.component';
import { QuestionsetDraftComponent } from './components/questionset-draft/questionset-draft.component';
import { QuestionsetComponent } from './components/questionset/questionset.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { QuestionsetUpForReviewComponent } from './components/questionset-up-for-review/questionset-up-for-review.component';
import { QuestionsetReviewSubmissionsComponent } from './components/questionset-review-submissions/questionset-review-submissions.component';
import { QuestionsetPublishedComponent } from './components/questionset-published/questionset-published.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  // { path: 'player', loadChildren: () => import('./modules/player/player.module').then(m => m.PlayerModule) },
  {
    path: 'content-list', component: PlayerContentListComponent
  },
  {
    path: 'player/:id', component: PlayerComponent
  },
  {
    path: 'questionset', component: QuestionsetComponent,
    children: [
      {
        path: 'create', component: QuestionsetCreateComponent
      },
      {
        path: 'draft', component: QuestionsetDraftComponent
      },
      {
        path: 'upForReview', component: QuestionsetUpForReviewComponent
      },
      {
        path: 'review', component: QuestionsetReviewSubmissionsComponent
      },
      {
        path: 'published', component: QuestionsetPublishedComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

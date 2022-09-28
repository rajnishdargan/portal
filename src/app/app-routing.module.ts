import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { PlayerComponent } from './components/player/player.component';
import { QuestionsetCreateComponent } from './components/questionset-create/questionset-create.component';
import { QuestionsetEditorComponent } from './components/questionset-editor/questionset-editor.component';
import { QuestionsetListComponent } from './components/questionset-list/questionset-list.component';
import { QuestionsetWorkspaceComponent } from './components/questionset-workspace/questionset-workspace.component';

const routes: Routes = [
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
        path: 'create', component: QuestionsetCreateComponent
      },
      {
        path: 'questionset-list/:pageNumber', component: QuestionsetListComponent
      }
    ]
  },
  {
    path: 'edit/questionset/:id/:status', component: QuestionsetEditorComponent
  },
  {
    path: '', component: HomeComponent
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

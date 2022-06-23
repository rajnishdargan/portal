import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { PlayerComponent } from './components/player/player.component';
import { QuestionsetEditorComponent } from './components/questionset-editor/questionset-editor.component';
import { QuestionsetListComponent } from './components/questionset-list/questionset-list.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'content-list', component: PlayerContentListComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: 'questionset-editor/:id', component: QuestionsetEditorComponent },
  { path: 'questionset-list', component: QuestionsetListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

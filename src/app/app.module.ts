import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
// import { PlayerComponent } from './components/player/player.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionCursor, QumlLibraryModule } from '@project-sunbird/sunbird-quml-player-v9';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { QuestionCursorImplementationService } from './services/question-cursor-implementation.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { PlayerComponent } from './components/player/player.component';
// import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditConfigurationComponent } from './components/edit-configuration/edit-configuration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsetEditorComponent } from './components/questionset-editor/questionset-editor.component';
import { CollectionEditorLibraryModule, EditorCursor } from '@project-sunbird/sunbird-collection-editor-v9';
import { FilterComponent } from './components/filter/filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { EditorCursorImplementationService } from './editor-cursor-implementation.service';
import { QuestionsetDraftComponent } from './components/questionset-draft/questionset-draft.component';
import { QuestionsetWorkspaceComponent } from './components/questionset-workspace/questionset-workspace.component';
import { QuestionsetCreateComponent } from './components/questionset-create/questionset-create.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { QuestionsetUpForReviewComponent } from './components/questionset-up-for-review/questionset-up-for-review.component';
import { QuestionsetReviewSubmissionsComponent } from './components/questionset-review-submissions/questionset-review-submissions.component';
import { QuestionsetPublishedComponent } from './components/questionset-published/questionset-published.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PlayerComponent,
    FooterComponent,
    PlayerContentListComponent,
    EditConfigurationComponent,
    QuestionsetEditorComponent,
    FilterComponent,
    QuestionsetDraftComponent,
    QuestionsetWorkspaceComponent,
    QuestionsetCreateComponent,
    UserRolesComponent,
    QuestionsetUpForReviewComponent,
    QuestionsetReviewSubmissionsComponent,
    QuestionsetPublishedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    QumlLibraryModule,
    CarouselModule.forRoot(),
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollectionEditorLibraryModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: QuestionCursor,
      useClass: QuestionCursorImplementationService
    },
    {
      provide: EditorCursor,
      useExisting: EditorCursorImplementationService
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

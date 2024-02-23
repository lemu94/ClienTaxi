import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { ChampsComponent } from './components/champs/champs.component';
import { ElementComponent } from './components/element/element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { QuestionControlService } from './shared/dynaminc_form/question-control.service';
import { QuestionService } from './shared/dynaminc_form/question.service';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { TaxiService } from './services/taxi/taxi.service';
import { PersonneService } from './services/personne/personne.service';
import { CommandeService } from './services/commande/commande.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormulaireComponent,
    ChampsComponent,
    ElementComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    QuestionControlService,
    QuestionService,
    TaxiService,
    PersonneService,
    CommandeService,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

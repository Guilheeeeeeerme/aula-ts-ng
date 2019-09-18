import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DetalhePessoaComponent } from './components/detalhe-pessoa/detalhe-pessoa.component';
import { ListaPessoaComponent } from './components/lista-pessoa/lista-pessoa.component';

@NgModule({
  declarations: [
    AppComponent,
    DetalhePessoaComponent,
    ListaPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
    // Import other modules and dependencies here
  ],
  declarations: [
    // Declare any core components or directives here
  
    NotFoundComponent,
  ],
  exports: [
    // Export any components or directives that need to be accessible outside the core module
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule
    // Import other modules and dependencies here
  ],
  declarations: [
    // Declare any core components or directives here
  
    NotFoundComponent
  ],
  exports: [
    // Export any components or directives that need to be accessible outside the core module
  ]
})
export class CoreModule { }

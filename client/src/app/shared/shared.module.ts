import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [LoadingComponent],
})
export class SharedModule {}
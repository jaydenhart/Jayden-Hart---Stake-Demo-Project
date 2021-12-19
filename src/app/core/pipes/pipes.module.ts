import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindUserByIdPipe } from './find-user-by-id.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FindUserByIdPipe],
  exports: [FindUserByIdPipe],
})
export class PipesModule {}

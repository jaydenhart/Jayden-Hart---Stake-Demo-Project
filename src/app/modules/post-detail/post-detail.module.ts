import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PipesModule } from '../../core/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, PostDetailRoutingModule, PipesModule],
  declarations: [PostDetailComponent],
})
export class PostsDetailModule {
  constructor() {}
}

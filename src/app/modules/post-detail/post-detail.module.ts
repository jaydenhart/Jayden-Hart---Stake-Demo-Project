import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { PostDetailRoutingModule } from './post-detail-routing.module';

@NgModule({
  imports: [CommonModule, PostDetailRoutingModule],
  declarations: [PostDetailComponent],
})
export class PostsDetailModule {
  constructor() {
    console.log('Lazily Loaded : PostDetailModule');
  }
}

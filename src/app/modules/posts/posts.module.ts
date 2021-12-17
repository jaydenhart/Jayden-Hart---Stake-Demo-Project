import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { FindUserByIdPipe } from '../../core/pipes/find-user-by-id.pipe';
import { PostLinkComponent } from './components/post-link/post-link.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule],
  declarations: [
    PostsComponent,
    PostLinkComponent,
    FindUserByIdPipe,
    PaginationComponent,
  ],
})
export class PostsModule {
  constructor() {
    console.log('Lazily Loaded : PostsModule');
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostLinkComponent } from './components/post-link/post-link.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../core/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, PipesModule],
  declarations: [PostsComponent, PostLinkComponent, PaginationComponent],
})
export class PostsModule {}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PaginatedDataModel } from '../../core/models/paginated-data-model';
import { PostModel } from '../../core/models/post-model';
import { UserModel } from '../../core/models/user-model';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  public posts$: Observable<PaginatedDataModel<PostModel[]>> = null;
  public users$: Observable<UserModel[]> = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initialisePosts();
    this.initialiseUsers();
  }

  public trackPostsBy(index: number, post: PostModel) {
    return post.id;
  }

  public testChangeDetection() {
    console.log('PostsComponent ChangeDetection');
  }

  private initialisePosts() {
    this.posts$ = this.dataService
      .getPosts()
      .pipe(tap((res) => console.log('POSTS: ', res)));
  }

  private initialiseUsers() {
    this.users$ = this.dataService.getUsers();
  }

  public testOutput(data) {
    this.posts$ = this.dataService.getPosts(data);
  }
}

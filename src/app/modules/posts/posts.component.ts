import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
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

  private filterByUserSubscription: Subscription = null;
  public filterByUserControl: FormControl = new FormControl();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initialisePosts();
    this.initialiseUsers();
    this.fetchPostData();
    this.fetchUserData();
    this.initialiseFilterByUserSubscription();
  }

  public trackPostsBy(index: number, post: PostModel) {
    return post.id;
  }

  private initialisePosts() {
    this.posts$ = this.dataService.getPosts();
  }

  private initialiseUsers() {
    this.users$ = this.dataService.getUsers();
  }

  private fetchPostData() {
    this.dataService.fetchPosts();
  }

  private fetchUserData() {
    this.dataService.fetchUsers();
  }

  public paginatePosts(url) {
    this.dataService.fetchPosts(null, url);
  }

  private initialiseFilterByUserSubscription() {
    this.filterByUserSubscription = this.filterByUserControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((res) => this.filterPostsByUser(res));
  }

  private filterPostsByUser(event) {
    let queryParams = this.dataService.getBaseQueryParams();
    queryParams.userId = this.dataService.findUserIdsByName(event);
    this.dataService.fetchPosts(queryParams);
  }
}

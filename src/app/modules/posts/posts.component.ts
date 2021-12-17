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
  public filterByUserControl = new FormControl();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initialisePosts();
    this.initialiseUsers();
    this.getData();
    this.initialiseFilterByUserSubscription();
  }

  public trackPostsBy(index: number, post: PostModel) {
    return post.id;
  }

  public testChangeDetection() {
    console.log('PostsComponent ChangeDetection');
  }

  private getData() {
    this.dataService.fetchPosts();
    this.dataService.fetchUsers();
  }

  private initialisePosts() {
    this.posts$ = this.dataService.getPosts();
  }

  private initialiseUsers() {
    this.users$ = this.dataService.getUsers();
  }

  public testOutput(data) {
    this.dataService.fetchPosts();
  }

  private initialiseFilterByUserSubscription() {
    this.filterByUserSubscription = this.filterByUserControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((res) => this.filterPostsByUser(res));
  }

  private filterPostsByUser(event) {
    this.dataService.fetchPosts(this.dataService.findUserIdsByName(event));
  }
}

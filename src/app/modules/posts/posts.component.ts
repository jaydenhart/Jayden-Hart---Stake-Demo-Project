import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PaginatedDataModel } from '../../core/models/paginated-data-model';
import { PostModel } from '../../core/models/post-model';
import { UserModel } from '../../core/models/user-model';
import { DataService } from '../../core/services/data.service';

/**
 * @name PostsComponent
 * @class
 * @description Page used to display all Posts as PostLinks
 */
@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts$: Observable<PaginatedDataModel<PostModel[]>> = null;
  public users$: Observable<UserModel[]> = null;

  private filterByUserSubscription: Subscription = null;
  public filterByUserControl: FormControl = new FormControl();

  /**
   * @constructor
   * @description Injects services
   */
  constructor(private dataService: DataService) {}

  /**
   * @name ngOnInit
   * @function
   * @returns {void} void
   * @description Initialises and fetches all data
   */
  ngOnInit(): void {
    this.initialisePosts();
    this.initialiseUsers();
    this.fetchPostData();
    this.fetchUserData();
    this.initialiseFilterByUserSubscription();
  }

  /**
   * @name ngOnDestroy
   * @function
   * @returns {void} void
   * @description Uninitialises and Unsubscribes all data
   */
  ngOnDestroy(): void {
    this.filterByUserSubscription.unsubscribe();
  }

  /**
   * @name trackPostsBy
   * @function
   * @param {number} index - The index of the iterated object
   * @param {PostModel} post - The PostModel of the iterated object
   * @returns {number} Post ID - The id of the post
   * @description Returns the post ID used for ngFor tracking
   */
  public trackPostsBy(index: number, post: PostModel): number {
    return post.id;
  }

  /**
   * @name initialisePosts
   * @function
   * @returns {void} void
   * @description Set the posts$ observable to the locally stored posts observable provided in the DataService
   */
  private initialisePosts(): void {
    this.posts$ = this.dataService.getPosts();
  }

  /**
   * @name initialiseUsers
   * @function
   * @returns {void} void
   * @description Set the users$ observable to the locally stored posts observable provided in the DataService
   */
  private initialiseUsers(): void {
    this.users$ = this.dataService.getUsers();
  }

  /**
   * @name fetchPostData
   * @function
   * @returns {void} void
   * @description Instructs the data service to fetch all posts using the default query params/pagination settings.
   */
  private fetchPostData(): void {
    this.dataService.fetchPosts();
  }

  /**
   * @name fetchUserData
   * @function
   * @returns {void} void
   * @description Instructs the data service to fetch all Users.
   */
  private fetchUserData(): void {
    this.dataService.fetchUsers();
  }

  /**
   * @name fetchPostData
   * @function
   * @returns {void} void
   * @description Instructs the data service to fetch all posts using the default query params with pagination settings returned by the pagination buttons.
   */
  public paginatePosts(url): void {
    this.dataService.fetchPosts(url);
  }

  /**
   * @name initialiseFilterByUserSubscription
   * @function
   * @returns {void} void
   * @description Initialises the FilterByUserSubscription, used to watch the input value changes and filter posts accordingly.
   */
  private initialiseFilterByUserSubscription(): void {
    this.filterByUserSubscription = this.filterByUserControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((res) => this.filterPostsByUser(res));
  }

  /**
   * @name filterPostsByUser
   * @function
   * @returns {void} void
   * @description Creates new query params with an array of user IDs found by matching a searchQuery string with the user usernames, and fetches all posts that match the array of user IDs
   */
  private filterPostsByUser(searchQuery: string): void {
    let queryParams = this.dataService.getBaseQueryParams();
    queryParams.userId = this.dataService.findUserIdsByUsername(searchQuery);
    this.dataService.fetchPosts(null, queryParams);
  }
}

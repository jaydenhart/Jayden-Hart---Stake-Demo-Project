import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostModel } from '../../core/models/post-model';
import { UserModel } from '../../core/models/user-model';
import { DataService } from '../../core/services/data.service';

/**
 * @name PostDetailComponent
 * @class
 * @description Page used to display a single Posts data.
 */
@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  public post$: Observable<PostModel> = null;
  public users$: Observable<UserModel[]> = null;

  /**
   * @constructor
   * @description Injects services
   */
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  /**
   * @name ngOnInit
   * @function
   * @returns {void} void
   * @description Initialises and fetches all data
   */
  ngOnInit(): void {
    this.initialiseAndFetchPost();
    this.initialiseUsers();
    this.fetchUserData();
  }

  /**
   * @name initialiseAndFetchPost
   * @function
   * @returns {void} void
   * @description Fetches post by route param Post ID, and sets post observable to fetch Observable.
   */
  private initialiseAndFetchPost(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.dataService.fetchPost(parseInt(params.get('id')));
      })
    );
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
   * @name fetchUserData
   * @function
   * @returns {void} void
   * @description Instructs the data service to fetch all Users.
   */
  private fetchUserData() {
    this.dataService.fetchUsers();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseQueryParamsModel } from '../models/base-query-params-model';
import { PaginatedDataModel } from '../models/paginated-data-model';
import { PaginationLinksModel } from '../models/pagination-links-model';
import { PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';

/**
 * @name DataService
 * @class
 * @description Manages all data and API calls for both Posts and Users.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private posts$: BehaviorSubject<PaginatedDataModel<PostModel[]>> =
    new BehaviorSubject<PaginatedDataModel<PostModel[]>>(null);

  private users$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >(null);

  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  /**
   * @constructor
   * @description Injects services
   */
  constructor(private http: HttpClient) {}

  /**
   * @name fetchPosts
   * @function
   * @returns {Subscription} The subscription of the http.get fetch call.
   * @description Fetches all posts and pushes them to the posts$ observable for use througout the app
   */
  public fetchPosts(
    url: string = null,
    queryParams: BaseQueryParamsModel | any = this.getBaseQueryParams()
  ): Subscription {
    if (url == null) {
      url = this.baseUrl + '/posts';
    }

    return this.http
      .get(url, {
        params: queryParams,
        observe: 'response',
      })
      .pipe(
        map((res: any) => {
          const paginatedData: PaginatedDataModel<PostModel[]> = {
            paginationLinks: this.parseLinkHeader(res.headers.get('Link')),
            data: res.body,
          };

          return paginatedData;
        })
      )
      .subscribe((res) => this.posts$.next(res));
  }

  /**
   * @name fetchPost
   * @function
   * @param {number} id - The post ID to search for
   * @returns {Observable<PostModel>} An Observable containing the PostModel returned by the API fetch.
   * @description Gets and returns a single post matched by id as an observable.
   */
  public fetchPost(id: number = 0): Observable<PostModel> {
    return this.http.get<PostModel>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }

  /**
   * @name fetchUsers
   * @function
   * @returns {Subscription} The subscription of the http.get fetch call.
   * @description Fetches all users and pushes them to the users$ observable for use througout the app
   */
  public fetchUsers(): Subscription {
    return this.http
      .get<UserModel[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((res) => this.users$.next(res));
  }

  /**
   * @name parseLinkHeader
   * @function
   * @param {string} linkHeader - The LINK header returned by the paginated FETCH API.
   * @returns {PaginationLinksModel} An Object containing the First, Prev, Next, and Last pagination links
   * @description Parses and returns the link headers from a paginated http request into a PaginationLinksModel
   */
  private parseLinkHeader(linkHeader): PaginationLinksModel {
    if (linkHeader == null || linkHeader == '') {
      return {};
    }

    const linkHeadersArray = linkHeader
      .split(', ')
      .map((header) => header.split('; '));

    const linkHeadersMap = linkHeadersArray.map((header) => {
      const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '');
      const thisHeaderUrl = header[0]
        .slice(1, -1)
        .replace('http://', 'https://');
      return [thisHeaderRel, thisHeaderUrl];
    });

    let linkHeadersObject: PaginationLinksModel = {};

    for (let [key, value] of linkHeadersMap) {
      linkHeadersObject[key] = value;
    }

    return linkHeadersObject;
  }

  /**
   * @name getPosts
   * @function
   * @returns {Observable<PaginatedDataModel<PostModel[]>>} An observable containing a Paginated Data Model of all PostModels
   * @description Returns all locally stored paginated Posts as an observable.
   */
  public getPosts(): Observable<PaginatedDataModel<PostModel[]>> {
    return this.posts$.asObservable();
  }

  /**
   * @name getUsers
   * @function
   * @returns {Observable<UserModel[]>} An observable containing an array of all UserModels
   * @description Returns all locally stored UserModels as an observable.
   */
  public getUsers(): Observable<UserModel[]> {
    return this.users$.asObservable();
  }

  /**
   * @name findUserIdsByUsername
   * @function
   * @param {string} searchQuery - The search query to compare to the users username.
   * @returns {number[]} An array of all matched user IDs
   * @description Finds and returns all IDs of users matched by a searchQuery compared to a users username
   */
  public findUserIdsByUsername(searchQuery: string): number[] {
    if (searchQuery == null || searchQuery == '') return [];

    let foundUserIds: number[] = this.users$.value
      .filter((user) => {
        return user.username.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((user) => {
        return user.id;
      });

    if (foundUserIds.length == 0) {
      return null;
    }

    return foundUserIds;
  }

  /**
   * @name getBaseQueryParams
   * @function
   * @returns {BaseQueryParamsModel} An BaseQueryParamsModel containing all of the query params for a paginated API GET.
   * @description Returns an object containing all of the base query params for a paginated API GET, for use with fetching Posts.
   */
  public getBaseQueryParams(): BaseQueryParamsModel {
    return {
      userId: [],
      _page: 1,
      _limit: 10,
    };
  }
}

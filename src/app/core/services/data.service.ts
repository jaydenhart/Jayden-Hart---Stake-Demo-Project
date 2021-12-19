import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedDataModel } from '../models/paginated-data-model';
import { PaginationLinksModel } from '../models/pagination-links-model';
import { PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';

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

  constructor(private http: HttpClient) {}

  /**
   * @name fetchPosts
   * @function
   * @returns {Observable} JSON Posts
   * @description Gets and returns all posts as an observable.
   */
  public fetchPosts( //TODO: Try and swap url and query params around
    queryParams: any = this.getBaseQueryParams(),
    url: string = this.baseUrl + '/posts'
  ): Subscription {
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

  public getBaseQueryParams() {
    return {
      userId: [],
      _page: 1,
      _limit: 10,
    } as any; //TODO: Interface for this maybe
  }

  /**
   * @name fetchPost
   * @function
   * @returns {Observable} JSON Post
   * @description Gets and returns a single post by id as an observable.
   */
  public fetchPost(id: number = 0): Observable<PostModel> {
    return this.http.get<PostModel>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }

  /**
   * @name fetchUsers
   * @function
   * @returns {Observable} JSON Users
   * @description Gets and returns all users as an observable.
   */
  public fetchUsers(): Subscription {
    return this.http
      .get<UserModel[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((res) => this.users$.next(res));
  }

  /**
   * @name parseLinkHeader
   * @function
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

  //   function getParameterByName(name, url = window.location.href) {
  //     name = name.replace(/[\[\]]/g, '\\$&');
  //     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  //         results = regex.exec(url);
  //     if (!results) return null;
  //     if (!results[2]) return '';
  //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
  // }

  public getPosts(): Observable<PaginatedDataModel<PostModel[]>> {
    return this.posts$.asObservable();
  }

  public getUsers(): Observable<UserModel[]> {
    return this.users$.asObservable();
  }

  public findUserIdsByName(searchQuery): number[] {
    if (searchQuery == null || searchQuery == '') return [];

    let foundUserIds: number[] = this.users$.value
      .filter((user) => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((user) => {
        return user.id;
      });

    if (foundUserIds.length == 0) {
      return null;
    }

    return foundUserIds;
  }
}

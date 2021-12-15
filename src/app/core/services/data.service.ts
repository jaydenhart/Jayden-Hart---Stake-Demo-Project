import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedDataModel } from '../models/paginated-data-model';
import { PaginationLinksModel } from '../models/pagination-links-model';
import { PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * @name getPosts
   * @function
   * @returns {Observable} JSON Posts
   * @description Gets and returns all posts as an observable.
   */
  public getPosts(
    url: string = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10'
  ): Observable<PaginatedDataModel<PostModel[]>> {
    return this.http.get(url, { observe: 'response' }).pipe(
      map((res: any) => {
        const paginatedData: PaginatedDataModel<PostModel[]> = {
          paginationLinks: this.parseLinkHeader(res.headers.get('Link')),
          data: res.body,
        };

        return paginatedData;
      })
    );
  }

  /**
   * @name getPost
   * @function
   * @returns {Observable} JSON Post
   * @description Gets and returns a single post by id as an observable.
   */
  public getPost(id: number = 0): Observable<PostModel> {
    return this.http.get<PostModel>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }

  /**
   * @name getUsers
   * @function
   * @returns {Observable} JSON Users
   * @description Gets and returns all users as an observable.
   */
  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

  /**
   * @name parseLinkHeader
   * @function
   * @returns {PaginationLinksModel} An Object containing the First, Prev, Next, and Last pagination links
   * @description Parses and returns the link headers from a paginated http request into a PaginationLinksModel
   */
  private parseLinkHeader(linkHeader): PaginationLinksModel {
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
}

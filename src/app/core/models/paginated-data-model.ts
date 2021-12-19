import { PaginationLinksModel } from './pagination-links-model';

/**
 * @name PaginatedDataModel
 * @interface
 * @description Interface used to describe the returned data of a paginted API call.
 */
export interface PaginatedDataModel<T> {
  paginationLinks?: PaginationLinksModel;
  data?: T;
}

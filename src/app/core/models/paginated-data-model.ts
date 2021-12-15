import { PaginationLinksModel } from './pagination-links-model';

export interface PaginatedDataModel<T> {
  paginationLinks?: PaginationLinksModel;
  data?: T;
}

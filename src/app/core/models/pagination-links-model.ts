import { PaginationLinkParamsModel } from './pagination-link-params-model';

export interface PaginationLinksModel {
  first?: PaginationLinkParamsModel;
  prev?: PaginationLinkParamsModel;
  next?: PaginationLinkParamsModel;
  last?: PaginationLinkParamsModel;
}

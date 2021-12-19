import { PaginationLinkParamsModel } from './pagination-link-params-model';

/**
 * @name PaginationLinksModel
 * @interface
 * @description Interface used to describe the URLs for paginated data APIs provided by the LINKS header of a returned API Fetch
 */
export interface PaginationLinksModel {
  first?: PaginationLinkParamsModel;
  prev?: PaginationLinkParamsModel;
  next?: PaginationLinkParamsModel;
  last?: PaginationLinkParamsModel;
}

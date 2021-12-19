/**
 * @name PaginationLinkParamsModel
 * @interface
 * @description Interface used to describe the Query Params for paginated data APIs provided by the LINKS header of a returned API Fetch,and used for future paginted API calls.
 */
export interface PaginationLinkParamsModel {
  page: number;
  limit: number;
}

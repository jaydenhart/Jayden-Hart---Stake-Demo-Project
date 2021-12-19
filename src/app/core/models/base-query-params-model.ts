/**
 * @name BaseQueryParamsModel
 * @interface
 * @description Interface used to describe the Base Query Params used in paginted API calls.
 */
export interface BaseQueryParamsModel {
  userId: number[];
  _page: number;
  _limit: number;
}

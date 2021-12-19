/**
 * @name PostModel
 * @interface
 * @description Interface used to describe the Attributes of a Post
 */
export interface PostModel {
  userId?: number;
  id: number;
  title?: string;
  body?: string;
}

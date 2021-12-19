import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PostModel } from '../../../../core/models/post-model';
import { UserModel } from '../../../../core/models/user-model';

/**
 * @name PostLinkComponent
 * @class
 * @description Component used to display post data as a link to the PostDetailComponent
 */
@Component({
  selector: 'post-link',
  templateUrl: './post-link.component.html',
  styleUrls: ['./post-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostLinkComponent {
  @Input() post: PostModel = null;
  @Input() user: UserModel = null;

  /**
   * @constructor
   * @description Injects services
   */
  constructor() {}
}

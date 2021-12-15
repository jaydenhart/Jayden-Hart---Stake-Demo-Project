import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { PostModel } from '../../../../core/models/post-model';
import { UserModel } from '../../../../core/models/user-model';

@Component({
  selector: 'post-link',
  templateUrl: './post-link.component.html',
  styleUrls: ['./post-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostLinkComponent implements OnInit {
  @Input() post: PostModel = null;
  @Input() user: UserModel = null;

  constructor() {}

  ngOnInit(): void {}
}

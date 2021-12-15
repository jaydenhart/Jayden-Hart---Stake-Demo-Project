import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PaginationLinksModel } from '../../../../core/models/pagination-links-model';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() paginationLinks: PaginationLinksModel = {};
  @Output() test: any = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  testFunction(data) {
    this.test.next(data);
  }
}

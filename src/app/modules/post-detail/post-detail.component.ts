import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { find, switchMap } from 'rxjs/operators';
import { PostModel } from '../../core/models/post-model';
import { UserModel } from '../../core/models/user-model';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  public post$: Observable<PostModel> = null;
  public users$: Observable<UserModel[]> = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialisePost();
    this.initialiseUser();
    this.fetchUserData();
  }

  private initialisePost() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.dataService.fetchPost(parseInt(params.get('id')));
      })
    );
  }

  private initialiseUser() {
    this.users$ = this.dataService.getUsers();
  }

  private fetchPostData() {
    this.dataService.fetchPosts();
  }

  private fetchUserData() {
    this.dataService.fetchUsers();
  }
}

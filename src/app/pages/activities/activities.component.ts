import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../redux/states/applicationState';
import { Observable } from 'rxjs/Observable';
import { IActivityType } from '../../models/interfaces';

import * as fromStore from '../../redux/selectors';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { MergeActivitiesAction } from '../../redux/actions/activityLogActions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  public modalRef: BsModalRef;
  public activities$: Observable<IActivityType[]>;

  public confirmMerge$ = new Subject<{ source: IActivityType, target: IActivityType }>();

  public mergeSource: IActivityType;

  constructor(public store: Store<ApplicationState>, private modalService: BsModalService) {
    this.activities$ = store.select(fromStore.activityTypes).map(types => types.activities);

    this.confirmMerge$.withLatestFrom(this.activities$).subscribe(([merge, activities]) => {
      const srcs = activities.filter(v => v.id === merge.source.id);
      const dsts = activities.filter(v => v.id === merge.target.id);
      if (srcs.length !== 1) {
        console.log('ERROR: wrong number of matching source activities found: ' + JSON.stringify(srcs, undefined, 2));
        return;
      }
      if (dsts.length !== 1) {
        console.log('ERROR: wrong number of matching target activities found. ' + JSON.stringify(dsts, undefined, 2));
        return;
      }
      const src = srcs[0];
      const dst = dsts[0];
      console.log('merging', src, ' into ', dst);
      this.store.dispatch(new MergeActivitiesAction(src.id, dst.id));
      this.hideModal();
    });
  }

  ngOnInit() {
  }

  openMergeDialog(template: TemplateRef<any>, source: IActivityType) {
    this.modalRef = this.modalService.show(template);
    this.mergeSource = source;
  }

  merge() {
  }

  hideModal() {
    this.modalRef.hide();
    this.mergeSource = undefined;
  }
}

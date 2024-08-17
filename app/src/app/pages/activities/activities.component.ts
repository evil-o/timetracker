import { Component, TemplateRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { IActivityType } from "../../models/interfaces";
import { ApplicationState } from "../../redux/states/application-state";

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { map, Observable, Subject, withLatestFrom } from "rxjs";
import { activityLogActions } from "../../redux/actions/activity-log.actions";
import * as fromStore from "../../redux/selectors";

@Component({
    selector: "app-activities",
    templateUrl: "./activities.component.html",
    styleUrls: ["./activities.component.css"],
})
export class ActivitiesComponent {
    public modalRef!: BsModalRef;
    public activities$: Observable<IActivityType[]>;
    public activitiesWithoutSource!: IActivityType[];

    public confirmMerge$ = new Subject<{
        source: IActivityType;
        target: IActivityType;
    }>();

    public mergeSource!: IActivityType;
    public mergeSource$ = new Subject<IActivityType | undefined>();

    constructor(
        public store: Store<ApplicationState>,
        private modalService: BsModalService
    ) {
        this.activities$ = store
            .select(fromStore.activityTypes)
            .pipe(map((types) => types.activities));
        this.mergeSource$.subscribe((source) => {
            if (!source) {
                return;
            }
            this.mergeSource = source;
        });

        this.mergeSource$
            .pipe(withLatestFrom(this.activities$))
            .subscribe(([source, activities]) => {
                this.activitiesWithoutSource = activities.filter(
                    (a) => source === undefined || a.id !== source.id
                );
            });

        this.confirmMerge$
            .pipe(withLatestFrom(this.activities$))
            .subscribe(([merge, activities]) => {
                const srcs = activities.filter((v) => v.id === merge.source.id);
                const dsts = activities.filter((v) => v.id === merge.target.id);
                if (srcs.length !== 1) {
                    console.log(
                        "ERROR: wrong number of matching source activities found: " +
                            JSON.stringify(srcs, undefined, 2)
                    );
                    return;
                }
                if (dsts.length !== 1) {
                    console.log(
                        "ERROR: wrong number of matching target activities found. " +
                            JSON.stringify(dsts, undefined, 2)
                    );
                    return;
                }
                const src = srcs[0];
                const dst = dsts[0];
                console.log("merging", src, " into ", dst);
                this.store.dispatch(
                    activityLogActions.mergeActivities({
                        sourceActvityId: src.id,
                        targetActivityId: dst.id,
                    })
                );
                this.hideModal();
            });
    }

    openMergeDialog(template: TemplateRef<any>, source: IActivityType) {
        this.mergeSource$.next(source);
        this.modalRef = this.modalService.show(template);
    }

    merge() {}

    hideModal() {
        this.mergeSource$.next(undefined);
        this.modalRef.hide();
    }
}

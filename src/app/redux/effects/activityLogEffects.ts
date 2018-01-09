import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ActivityLogEffects {
  // Listen for the 'LOGIN' action
  // @Effect() newActivityTypeLogged$: Observable<Action> = this.actions$;

  constructor(
    private actions$: Actions
  ) {}
}

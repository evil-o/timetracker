import { activityTypesReducer } from './activityTypes';
import { IActivityTypes } from '../states/activityTypes';
import { MergeActivitiesAction } from '../actions/activityLogActions';
import { IActivityType } from '../../models/interfaces';

describe('the activity types reducer', () => {

  it('should remove merged activity types', () => {
    const a1: IActivityType = {
      id: 'activity1',
      name: 'activity2',
      isNonWorking: false,
    };
    const a2: IActivityType = {
      id: 'activity2',
      name: 'activity1',
      isNonWorking: true,
    };
    const initialState: IActivityTypes = {
      activities: [a1, a2],
    };

    const src = 'activity1';
    const dst = 'activity2';
    const next = activityTypesReducer(initialState, new MergeActivitiesAction(src, dst));
    expect(next.activities.length).toEqual(1);
    expect(next.activities[0]).toEqual(a2);
  });
});

import { MergeActivitiesAction } from '../actions/activityLogActions.legacy';
import { IActivityLog } from '../states/activityLog';
import { activityLogReducer } from './activityLog.legacy';

describe('the activity log reducer', () => {

  it('should properly merge all entries belonging to an activity id', () => {
    const initialState: IActivityLog = {
      entries: [
        {
          actvitiyId: 'activity1',
          id: 'test1',
          day: 1,
          month: 2,
          year: 2,
          hours: 1,
          description: 'test',
        },
        {
          actvitiyId: 'activity1',
          id: 'test2',
          day: 1,
          month: 2,
          year: 2,
          hours: 1,
          description: 'test',
        },
        {
          actvitiyId: 'activity2',
          id: 'test2',
          day: 1,
          month: 2,
          year: 2,
          hours: 1,
          description: 'test',
        },
      ]
    };

    const src = 'activity1';
    const dst = 'activity2';
    const next = activityLogReducer(initialState, new MergeActivitiesAction(src, dst));
    expect(next.entries.length).toBe(3);
    expect(next.entries[0].actvitiyId).toBe(dst);
    expect(next.entries[1].actvitiyId).toBe(dst);
    expect(next.entries[2].actvitiyId).toBe(dst);
  });
});

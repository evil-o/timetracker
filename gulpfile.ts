import { Gulpclass, Task } from 'gulpclass/Decorators';

import * as gulp from 'gulp';
import * as del from 'del';
import * as childProcess from 'child_process';
import * as spawn from 'cross-spawn';
import * as runSequence from 'run-sequence';

// let gulp = require('gulp');
// let del = require('del');

@Gulpclass()
export class Gulpfile {
  public static outputBase = '../oliverlomp.bitbucket.io/timetracker/';

  @Task()
  async clean() {
    await del(['assets', '*.bundle.js', '*.bundle.css'].map(p => Gulpfile.outputBase + p), {force: true});
  }

  @Task()
  async build() {
    await new Promise(async (resolve, reject) => {
      const run = spawn('npm', ['run', 'build']);
      run.stdout.on('data', (data) => console.log(data.toString()));
      run.stderr.on('data', (data) => console.log(data.toString()));
      run.on('exit', (code) => {
        if (code !== 0) {
          reject('Process exited with non-zero code ' + code);
        } else {
          resolve();
        }
      });
    });
  }

  @Task()
  copy() {
    return gulp.src(['./dist/*'])
    .pipe(gulp.dest(Gulpfile.outputBase));
  }

  @Task()
  dist() {
    runSequence('clean', 'build', 'copy');
  }
}

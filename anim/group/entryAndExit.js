import { fixProgress } from '../../utils/base';
/**
 * 入离场动画
 */
class EntryAndExitTaskGroup {
    taskArray = [];
    /** 持续的时间 */
    duration;
    /** 任务开始时间 */
    _startMs = -1;
    /** 当前进度 [0,1] */
    _curProgress = -1;
    /** 进度递减: true; 进度递增: false 标志位 */
    _reverse = false;
    constructor(duration) {
        this.duration = duration;
    }
    isStart() {
        return this.taskArray.some((_task => _task.isStart()));
    }
    run(_currentMs) {
        if (this._startMs === -1) {
            if (this._curProgress === -1) {
                this._startMs = _currentMs;
                this._curProgress = 0;
            } else {
                this._startMs = _currentMs - this._curProgress * this.duration
            }
            this._reverseProgress = this._curProgress;
        }
        const progress = fixProgress((_currentMs - this._startMs) / this.duration);
        this.runByProgress(progress);
    }
    runByProgress(_progress) {
        this._curProgress = _progress;
        this.taskArray.forEach(_task => {
            return _task.run(fixProgress(this._curProgress));
        })
    }
    clearTaskFinished() {
        this.taskArray = this.taskArray.filter(_task => !_task.isStop());
    }
}

export default EntryAndExitTaskGroup;
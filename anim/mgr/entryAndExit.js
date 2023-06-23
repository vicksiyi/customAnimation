import AnimationLoop from "../loop";
import EntryAndExitTaskGroup from "../group/entryAndExit";
import EntryAndExitAnimationTask from "../task/entryAndExit";
/**
 * 管理组
 */
class EntryAndExitAnimationMgr {
    static _instance;
    _taskGroupArray = [];
    static getInstance() {
        if (!this._instance) this._instance = new EntryAndExitAnimationMgr();
        return this._instance;
    }
    static getCurrentMs() {
        return new Date().getTime();
    }
    constructor() {
        // 初始化事件轮询
        AnimationLoop.getInstance().addCallback(() => {
            this._onAnimationFrame();
        });
    }
    _onAnimationFrame() {
        const currentMs = EntryAndExitAnimationMgr.getCurrentMs();
        this._taskGroupArray.forEach(_taskGroup => {
            _taskGroup.run(currentMs);
        });
        this._clearTaskGroupFinished();
        this._stopLoopHandler();
    }
    _stopLoopHandler() {
        if (this._taskGroupArray.length <= 0) {
            AnimationLoop.getInstance().stop();
        }
    }
    _startLooHandler() {
        if (!AnimationLoop.getInstance().isLooping) {
            AnimationLoop.getInstance().start();
        }
    }
    /** 添加一个入离场动画 */
    addAnimation(data, delay) {
        const handler = (data) => {
            const { duration, className, interpolatorCurve, visualState, isReverse, trOrigin } = data;
            this.stopElAnimation(className); // 停止原先的动画
            const taskGroup = new EntryAndExitTaskGroup(duration);
            const task = new EntryAndExitAnimationTask(
                className,
                visualState,
                interpolatorCurve,
                isReverse,
                trOrigin
            );

            if (task) {
                taskGroup.taskArray.push(task);
            }

            if (taskGroup.taskArray.length <= 0) {
                return;
            }
            this._taskGroupArray.push(taskGroup);
            this._startLooHandler();
        }
        if (typeof delay === 'undefined') {
            handler(data);
        } else {
            setTimeout(() => {
                handler(data);
            }, delay);
        }
    }
    stopElAnimation(className) {
        if (this._taskGroupArray.length <= 0) {
            return false;
        }
        this._taskGroupArray.forEach(_taskGroup => {
            _taskGroup.taskArray.forEach((_task) => {
                if (_task?.className == className) {
                    _task.stop();
                }
            });
        });
    }
    _clearTaskGroupFinished() {
        const taskGroupArraySize = this._taskGroupArray.length;
        if (taskGroupArraySize <= 0) {
            return false;
        }
        this._taskGroupArray.forEach(_taskGroup => {
            _taskGroup.clearTaskFinished();
        });
        this._taskGroupArray = this._taskGroupArray.filter(_taskGroup => _taskGroup.taskArray.length > 0);
    }
}

export default EntryAndExitAnimationMgr;
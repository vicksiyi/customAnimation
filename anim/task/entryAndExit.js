import BezierEasing from 'bezier-easing';
/**
 * 入离场任务类
 */
class EntryAndExitAnimationTask {
    _el;
    className;
    _easing;
    _visualState;
    _isReverse;
    _trOrigin;
    /** 任务是否开始标识位 */
    _start = false;
    /** 任务是否结束标志位 */
    _stop = false;
    /** 停止的时间 */
    _stopMs = -1;
    constructor(
        className,
        visualState,
        interpolatorCurve,
        isReverse,
        trOrigin
    ) {
        if (visualState && visualState.length !== 2) return;
        const _el = document.querySelector(`.${className}`);
        if (!_el) return;
        this.className = className;
        this._el = _el;
        this._visualState = visualState;
        this._easing = BezierEasing(...interpolatorCurve);
        this._isReverse = isReverse;
        this._trOrigin = trOrigin;
    }
    _getValByEasing(start, end, progress) {
        const _diff = end - start;
        return start + _diff * this._easing(progress);
    }
    _getVal(progress, isReverse) {
        let _frameArr = this._visualState;
        if (isReverse) {
            _frameArr = this._visualState.slice().reverse();
        }
        const start = _frameArr[0];
        const end = _frameArr[1];
        const res = {};
        for (const key in start) {
            const _startVal = start[key];
            const _endVal = end[key];
            res[key] = this._getValByEasing(_startVal, _endVal, progress);
        }
        return res;
    }
    _getCssByVal(val) {
        return {
            opacity: `${val.opacity / 100}`,
            transformOrigin: `${this._trOrigin.x * 100}% ${this._trOrigin.y * 100}%`,
            transform: `translate(${val.horizontalOffset}px,${val.verticalOffset}px) rotate(${val.rotate}deg) scale(${val.scale / 100})`
        }
    }
    /**
        * 更新元素的动画相关的css属性
        */
    _updateAnimPropCss(prop) {
        const _keys = Object.keys(prop);
        for (let index = 0; index < _keys.length; index++) {
            const _key = _keys[index];
            const _val = prop[_key];
            this._el.style[_key] = _val;
        }
    }
    isStart() {
        return this._start;
    }
    isStop() {
        return this._stop;
    }
    run(progress) {
        if (this._stop) return false;
        if (this._curProgress === progress) {
            this.stop(); // 不再改变，则停止动画
            return true;
        }
        this._curProgress = progress;
        const _curVal = this._getVal(progress, this._isReverse);
        const _curCss = this._getCssByVal(_curVal);
        this._updateAnimPropCss(_curCss);
        if (!this._start) {
            this.start();
        }
        return true;
    }
    start() {
        this._start = true;
        this._stop = false;
    }
    stop() {
        this._start = false;
        this._stop = true;
    }
}

export default EntryAndExitAnimationTask;
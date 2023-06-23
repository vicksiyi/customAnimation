/**
 * 轮询器
 */
class AnimationLoop {
    static _instance;
    static getInstance() {
        if (!this._instance) this._instance = new AnimationLoop();
        return this._instance;
    }
    constructor() {
        this.callbacks = [];
        this.isLooping = false;
    }

    start() {
        if (!this.isLooping) {
            this.isLooping = true;
            this.loop();
        }
    }

    stop() {
        this.isLooping = false;
    }

    loop() {
        const loopFn = () => {
            if (!this.isLooping) {
                return;
            }

            this.callbacks.forEach(callback => callback());

            requestAnimationFrame(loopFn);
        };

        requestAnimationFrame(loopFn);
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

    removeCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index !== -1) {
            this.callbacks.splice(index, 1);
        }
    }
}

export default AnimationLoop;
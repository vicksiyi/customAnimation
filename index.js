import EntryAndExitAnimationMgr from "./anim/mgr/entryAndExit";

EntryAndExitAnimationMgr.getInstance().addAnimation({
    duration: 3000,
    className: 'text1',
    interpolatorCurve: [0, 0, 1, 1],
    visualState: [{
        horizontalOffset: 0,
        opacity: 0,
        rotate: 0,
        scale: 1000,
        verticalOffset: 0
    }, {
        horizontalOffset: 1000,
        opacity: 100,
        rotate: 180,
        scale: 100,
        verticalOffset: 200
    }],
    isReverse: false,
    trOrigin: {
        x: 0,
        y: 0
    }
});

EntryAndExitAnimationMgr.getInstance().addAnimation({
    duration: 3000,
    className: 'text2',
    interpolatorCurve: [0, 0, 1, 1],
    visualState: [{
        horizontalOffset: 0,
        opacity: 0,
        rotate: 0,
        scale: 1000,
        verticalOffset: 0
    }, {
        horizontalOffset: 1000,
        opacity: 100,
        rotate: 180,
        scale: 100,
        verticalOffset: 200
    }],
    isReverse: false,
    trOrigin: {
        x: 0,
        y: 0
    }
}, 1000);
import Draggable from 'draggable'

class DragHandler {
    constructor(element, origin, maxDistance = 70) {
        this.maxDistance = maxDistance
        this.inTarget = false;
        this.origin = origin || {x: 0, y: 0};
        this.targetRect = null;
        this.onEndCb = this.onStartCb = this.onMoveCb = null;
        this.container = element;
        this.container.style.cursor = 'move';
        this.draggable = new Draggable(this.container, {
            useGPU: true,
            limit: {
                x: [0, window.innerWidth],
                y: [0, window.innerHeight]
            },
            onDragStart: (element, x, y, event) => {
                this.container.classList.add('over-droppable');
                this.targetRect = window.app.game.vase.container.getBoundingClientRect();
                if (this.onStartCb) {
                    const ret = {
                        element: element,
                        position: element.getBoundingClientRect(),
                        event: event
                    };
                    ret.inTarget = this.isInRect(ret.position);
                    this.onStartCb(ret)
                }
            },
            onDrag: (element, x, y, event) => {
                const ret = {
                    element: element,
                    position: element.getBoundingClientRect(),
                    event: event
                };
                ret.inTarget = this.isInRect(ret.position);
                if (this.onMoveCb) this.onMoveCb(ret)
            },
            onDragEnd: (element, x, y, event) => {
                this.container.classList.remove('over-droppable');
                const ret = {
                    element: element,
                    position: element.getBoundingClientRect(),
                    event: event
                };
                ret.inTarget = this.isInRect(ret.position);
                if (ret.inTarget) this.droppedOnTarget();
                this.onExitDroppable();
                this.container.style.transitionDuration = '1s';
                this.container.style.pointerEvents = 'none';
                this.container.style.top = '';
                this.container.style.left = '';
                after(1000, () => {
                    this.container.style.transitionDuration = '0s';
                    this.container.style.pointerEvents = 'auto'
                });
                if (this.onEndCb) this.onEndCb(ret)
            }
        });
    }
    onStart (cb) {
        this.onStartCb = cb
    }
    onMove (cb) {
        this.onMoveCb = cb
    }
    onEnd (cb) {
        this.onEndCb = cb
    }
    destroy () {
        this.container.style.transitionDuration = '1s';
        this.container.style.right = '';
        this.container.style.bottom = '';
        this.draggable.destroy()
    }
    onEnterDroppable () {
        window.app.game.vase.container.classList.add('draggable-over')
    }
    onExitDroppable () {
        window.app.game.vase.container.classList.remove('draggable-over')
    }
    droppedOnTarget () {
        window.app.game.vase.onDrop(this.container)
    }
    isInRect (position) {
        const rect = this.targetRect;
        const targetCenterX = rect.left + rect.width/2;
        const targetCenterY = rect.top + rect.height/2;
        const distance = Math.sqrt(
            Math.pow((targetCenterX - position.left - this.origin.x), 2) +
            Math.pow((targetCenterY - position.top - this.origin.y), 2)
        );
        const newInTargetCalculated = distance < this.maxDistance;
        if (this.inTarget && !newInTargetCalculated) this.onExitDroppable();
        else if (!this.inTarget && newInTargetCalculated) this.onEnterDroppable();
        this.inTarget = newInTargetCalculated;
        return newInTargetCalculated
    }
}

export default DragHandler
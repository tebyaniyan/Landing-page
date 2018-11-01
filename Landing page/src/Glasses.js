import DragHandler from './DragHandler'

class Glasses {
    constructor(query) {
        this.container = $(query);
        window.addEventListener('resize', () => {
            this.container.style.top = '';
            this.container.style.left = '';
        })
    }
    getOut () {
        this.draggable.destroy();
        this.container.classList.add('out-page')
    }
    makeDraggable () {
        this.container.style.transitionDuration = '0s';
        this.draggable = new DragHandler(this.container, {x: 0, y: 80});
    }
    comeOut () {
        this.container.classList.add('out');
        after(2000, this.makeDraggable.bind(this))
    }
}

export default Glasses
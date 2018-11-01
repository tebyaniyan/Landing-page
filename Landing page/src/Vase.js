const vaseEvolutionQueue = ['empty', 'soiled', 'seeded', 'filled', 'wet', 'green-little', 'green-medium', 'green-full'];
let levels = ['soil', 'seed', 'soil', 'water', 'water', 'water'];

class Vase {
    constructor (query, game) {
        this.game = game;
        this.container = $(query);
        this.state = 'empty'
    }
    set state (to) {
        this._state = to;
        this.container.setAttribute('data-state', to)
    }
    get state () {
        return this._state
    }
    comeOut () {
        this.container.classList.add('out');
        after(2000, () => { this.container.style.transitionDuration = '0.3s' })
    }
    next () {
        const nextIndex = vaseEvolutionQueue.indexOf(this.state) + 1;
        this.state = vaseEvolutionQueue[Math.min(nextIndex, vaseEvolutionQueue.length - 1)];
        if (this.state === 'wet') {
            after(600, this.game.iphone.unlock(10000));
            after(300, this.next.bind(this));
        }
        if (!['wet', 'green-little', 'green-medium'].includes(this.state)) this.game.paper.next()
    }
    onDrop (element) {
        const dropped = element.getAttribute('data-name');
        if (dropped === levels[0]) {
            levels.shift();
            this.next()
        }
    }
}

export default Vase
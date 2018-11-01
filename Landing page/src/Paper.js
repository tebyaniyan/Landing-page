class Paper {
    constructor (query, game) {
        this.game = game;
        this.container = $(query);
        this.items = $$(query + ' li');
        this.itemIndex = 0;
    }
    comeOut () {
        this.container.classList.add('out')
    }
    getOut () {
        this.container.classList.add('out-page')
    }
    bold () {
        this.container.classList.add('bold');
        after(2000, () => this.container.classList.remove('bold'))
    }
    next () {
        const duration = this.itemIndex === 0 ? 0 : 1000;
        let indexIterator = this.itemIndex;
        if (this.itemIndex > 0) {
            while (indexIterator > 0) {
                indexIterator--;
                this.items[indexIterator].classList.add('tick');
            }
        }
        if (this.itemIndex < this.items.length) after(duration, () => {
            this.bold();
            if (!this.items[this.itemIndex].classList.contains('tick')) {
                this.items[this.itemIndex].classList.add('active');
            }
            this.itemIndex++
        });
        else {
            this.game.onDone()
        }
    }
}

export default Paper
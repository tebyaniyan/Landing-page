class iPhone {
    constructor(query) {
        this.container = $(query);
        this.clock = $(query + ' .clock');
        this.container.addEventListener('click', this.toggle.bind(this));
        this.lockingTimeout = null;
        this.animationRunningTimeout = null;
        this.locked = true
    }
    unlock (timeToLockAgain) {
        if (this.locked) {
            if (this.animationRunningTimeout) clearTimeout(this.animationRunningTimeout);
            this.locked = false;
            this.clock.classList.remove('pause');
            this.container.classList.add('unlock');
            if (timeToLockAgain) this.lockingTimeout = after(timeToLockAgain, this.lock.bind(this))
        }
    }
    lock () {
        if (!this.locked) {
            this.locked = true;
            if (this.animationRunningTimeout) clearTimeout(this.animationRunningTimeout);
            this.animationRunningTimeout = after(300, () => this.clock.classList.add('pause'));
            this.container.classList.remove('unlock')
        }
    }
    toggle () {
        if (this.lockingTimeout) clearTimeout(this.lockingTimeout);
        this.locked ? this.unlock(2000) : this.lock();
    }
}

export default iPhone
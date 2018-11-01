class Box {
    constructor (query) {
        this.container = $(query);
        this.closeBoxImage = $(query + ' .closed');
        window.addEventListener('resize', this.fixSizes.bind(this));
    }
    goBack () {
        this.container.classList.add('back')
    }
    fixSizes () {
        window.areaDistFromTop = this.closeBoxImage.getBoundingClientRect().top;
        $('.game > .area').style.top = areaDistFromTop + 'px';
        $('.game > .area').style.height = (window.innerHeight - areaDistFromTop) + 'px'
    }
    open () {
        return new Promise((resolve) => {
            this.goBack();
            after(1200, () => {
                this.container.classList.add('open')
                this.fixSizes();
                resolve()
            });
        })
    }
    close () {
        this.fixSizes();
        this.container.classList.remove('open')
    }
}

export default Box
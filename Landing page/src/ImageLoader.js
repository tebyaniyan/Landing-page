const images = ['box-close.png', 'box-open.png', 'desk.svg', 'empty-vase.png', 'filled-vase.png', 'glasses-tilted.png', 'glasses.png', 'iphone.png', 'plant.png', 'seed.png', 'seeded-vase.png', 'soil.png', 'soiled-vase.png', 'wet-vase.png']

class ImageLoader {
    constructor (url, ondone) {
        this.ondone = ondone;
        this.loadedCount = 0;
        for (let name of images) this.load(url + '/' + name)
    }
    load (address) {
        const image = document.createElement('img');
        image.src = address;
        image.onload = () => {
            this.loadedCount++;
            if (this.loadedCount === images.length && this.ondone) {
                this.ondone()
            }
        }
    }
}

export default ImageLoader
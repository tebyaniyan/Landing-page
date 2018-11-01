import Box from './Box'
import Vase from './Vase'
import Paper from './Paper'
import Soil from './Soil'
import Seed from './Seed'
import Glasses from './Glasses'
import iPhone from './iPhone'

class Game {
    constructor (app) {
        this.app = app;
        this.container = $('.game');
        this.box = new Box('.game .box');
        this.vase = new Vase('.game .vase', this);
        this.paper = new Paper('.game .paper', this);
        this.soil = new Soil('.game .soil');
        this.seed = new Seed('.game .seed');
        this.glasses = new Glasses('.game .glasses');
        this.iphone = new iPhone('.game .iphone');
    }
    unBox () {
        $('.intro').classList.add('hide');
        this.box.open().then(() => {
            after(500, () => {
                after(200, () => this.seed.comeOut());
                after(1000, () => this.soil.comeOut());
                after(2000, () => this.vase.comeOut());
                after(2100, () => this.paper.comeOut());
                after(2500, () => this.glasses.comeOut());
                after(7000, () => this.paper.next());
            });
        });
    }
    onDone () {
        this.paper.bold();
        after(2000, () => {
            this.seed.getOut();
            this.soil.getOut();
            this.paper.getOut();
            this.glasses.getOut();
            after(1000, () => this.app.whenGameIsDone())
        });
    }
}

export default Game
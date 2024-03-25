import droplet from './../assets/droplet.png';

class BathwaterGun {
    scene: Phaser.Scene;

    preload(scene: Phaser.Scene) {
        this.scene = scene;
        this.scene.load.image('droplet', droplet);
    }

    create() {
        this.scene.add.particles(0, 100, 'droplet', {
            x: { min: 100, max: 640 },
            quantity: 2,
            lifespan: 2500,
            gravityY: 200
        });
    }

}

export default BathwaterGun;
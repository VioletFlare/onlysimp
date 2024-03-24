import Phaser from "phaser";
import sky from '../assets/space3.png'

class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('sky', sky);
    }

    create ()
    {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        particles.startFollow(logo);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 900,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200, x: 0 }
        }
    }
};

const game = new Phaser.Game(config);
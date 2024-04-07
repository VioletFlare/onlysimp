import Phaser from "phaser";
import sky from '../assets/space3.png'
import Player from './Player';

class MainScene extends Phaser.Scene
{
    player: Player;

    preload ()
    {
        this.player = new Player();
        this.player.preload(this);
        this.load.image('sky', sky);

    }

    create ()
    {
        this.physics.world.setBounds(0, 0, 1280, 900, true, true, true, true)
        this.player.create();
        /*
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
        */
    }

    update() {
        this.player.update();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 900,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: isDev
        }
    },
    
    
};

const game = new Phaser.Game(config);
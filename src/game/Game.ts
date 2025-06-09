import Phaser from "phaser";
import Player from './Player';

import bathroom2 from '../assets/bathroom2.png';
import map0 from '../assets/maps/map0.json';

class MainScene extends Phaser.Scene
{
    player: Player;

    preloadMap() {
        this.load.image('bathroom2', bathroom2);
        this.load.tilemapTiledJSON('map0', map0);
    }

    preloadPlayer() {
        this.player = new Player();
        this.player.preload(this);
    }

    preload ()
    {
        this.preloadMap();
        this.preloadPlayer();
    }

    createMap() {
        //this.add.image(0, 0, 'bathroom2')
        const map = this.make.tilemap({ key: 'map0' });
        const tileset = map.addTilesetImage('bathroom2', 'bathroom2');
        map.createLayer('ground', tileset, 0, 0);
    }

    create ()
    {
        this.physics.world.setBounds(0, 0, 1280, 900, true, true, true, true)
        this.createMap();
        this.player.create();
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
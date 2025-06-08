import Phaser from "phaser";
import Player from './Player';

import bathroom2 from 'assets/bathroom2.png';
import stage0 from 'assets/stage0.json';

class MainScene extends Phaser.Scene
{
    player: Player;

    preloadMap() {
        this.load.image('bathroom2', bathroom2);
        this.load.tilemapTiledJSON('stage0', stage0);
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
        const map = this.make.tilemap({ key: 'stage0' });
        const tileset = map.addTilesetImage('bathroom2');
        map.createLayer('ground', tileset);
    }

    create ()
    {
        this.physics.world.setBounds(0, 0, 1280, 900, true, true, true, true)
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
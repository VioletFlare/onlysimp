import girl from '../assets/girl_sprite.png';
import damagedGirl from '../assets/damaged_girl_sprite.png';
import BathwaterGun from './BathwaterGun';

class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bathwaterGun: BathwaterGun;

    preload(scene: Phaser.Scene) {
        this.scene = scene;

        this.scene.load.spritesheet('girl', girl, {
            frameWidth: 32,
            frameHeight: 48
        })

        this.bathwaterGun = new BathwaterGun();
        this.bathwaterGun.preload(this.scene)
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(200, 200, "girl");
        this.sprite.setOrigin(0.5, 1);
        this.sprite.scale = 2;
        this.sprite.setCollideWorldBounds(true);

        this.sprite.anims.create({
            key: 'walk-down',
            frames: this.sprite.anims.generateFrameNumbers('girl', { start: 0, end: 3 })
        });

        this.sprite.anims.create({
            key: 'walk-left',
            frames: this.sprite.anims.generateFrameNumbers('girl', { start: 4, end: 7 })
        });

        this.sprite.anims.create({
            key: 'walk-right',
            frames: this.sprite.anims.generateFrameNumbers('girl', { start: 8, end: 11 })
        });

        this.sprite.anims.create({
            key: 'walk-up',
            frames: this.sprite.anims.generateFrameNumbers('girl', { start: 12, end: 15 })
        });

        this.sprite.anims.create({
            key: 'idle',
            frames: [{ key: 'girl', frame: 0 }]
        })

        this.bathwaterGun.create(this);

        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.bathwaterGun.shot(pointer.position);
        })

        this.scene.input.on('pointerup', () => {
            this.bathwaterGun.stopShooting();
        })
    }

    update() {
        const cursors = this.scene.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.sprite.x -= 16;
            this.sprite.anims.play('walk-left', true)
        } else if (cursors.right.isDown) {
            this.sprite.x += 16;
            this.sprite.anims.play('walk-right', true)
        } else if (cursors.up.isDown) {
            this.sprite.y -= 16;
            this.sprite.anims.play('walk-up', true)
        } else if (cursors.down.isDown) {
            this.sprite.y += 16;
            this.sprite.anims.play('walk-down', true)
        } else {
            this.sprite.anims.play('idle', true)
        }

        this.bathwaterGun.update();
    }
}

export default Player;
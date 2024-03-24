import girl from '../assets/girl_sprite.png';
import damagedGirl from '../assets/damaged_girl_sprite.png';

const Vector2 = Phaser.Math.Vector2;

class Player {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    preload(scene: Phaser.Scene) {
        this.scene = scene;

        this.scene.load.spritesheet('girl', girl, {
            frameWidth: 32,
            frameHeight: 48
        })
    }

    create() {
        this.sprite = this.scene.add.sprite(200, 200, "girl");
        this.sprite.setOrigin(0.5, 1);
        this.sprite.scale = 2;

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
    }

    getPosition(): Phaser.Math.Vector2 {
        return this.sprite.getBottomCenter();
    }

    update() {
        const cursors = this.scene.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.sprite.x -= 8;
            this.sprite.anims.play('walk-left', true)
        } else if (cursors.right.isDown) {
            this.sprite.x += 8;
            this.sprite.anims.play('walk-right', true)
        } else if (cursors.up.isDown) {
            this.sprite.y -= 8;
            this.sprite.anims.play('walk-up', true)
        } else if (cursors.down.isDown) {
            this.sprite.y += 8;
            this.sprite.anims.play('walk-down', true)
        } else {
            this.sprite.anims.play('idle', true)
        }
    }
}

export default Player;
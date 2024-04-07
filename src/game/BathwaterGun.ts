import droplet from './../assets/droplet.png';
import Player from './Player';

class BathwaterGun {
    scene: Phaser.Scene;
    emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    player: Player;
    gunTargetPosition: Phaser.Math.Vector2;
    isShooting: boolean;
    rect: Phaser.GameObjects.Rectangle;

    preload(scene: Phaser.Scene) {
        this.scene = scene;
        this.scene.load.image('droplet', droplet);
    }

    create(player: Player) {
        this.emitter = this.scene.add.particles(-9999, 0, 'droplet', {
            x: {min: 4, max: 16},
            quantity: 0.5,
            lifespan: 1400,
            gravityY: 200
        });

        this.rect = new Phaser.GameObjects.Rectangle(this.scene, -9999, 0, 5, 5);
        this.emitter.startFollow(this.rect);


        this.player = player;
    }

    getAngle(playerX: number, playerY: number, targetX: number, targetY: number) {
        const angleDeg = (Math.atan2(targetY - playerY, targetX - playerX) * 180 / Math.PI) - 90;

        return angleDeg;
    }

    shot(targetPosition: Phaser.Math.Vector2) {
        this.gunTargetPosition = targetPosition;
        this.isShooting = true;
    }

    update() {
        if (this.isShooting) {
            const angle = this.getAngle(this.player.sprite.x, this.player.sprite.y, this.gunTargetPosition.x, this.gunTargetPosition.y);
            this.rect.setPosition(this.player.sprite.x, this.player.sprite.y);
            this.rect.setAngle(angle);
        }
    }

    stopShooting() {
        this.rect.setPosition(-9999, 0);
        this.isShooting = false;
    }
}

export default BathwaterGun;
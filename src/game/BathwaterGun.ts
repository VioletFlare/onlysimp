import droplet from './../assets/droplet.png';
import Player from './Player';

class BathwaterGun {
    scene: Phaser.Scene;
    emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    player: Player;
    gunTargetPosition: Phaser.Math.Vector2;
    isShooting: boolean;
    container: Phaser.GameObjects.Container;
    hitArea: Phaser.GameObjects.Rectangle;

    preload(scene: Phaser.Scene) {
        this.scene = scene;
        this.scene.load.image('droplet', droplet);
    }

    create(player: Player) {
        this.emitter = this.scene.add.particles(0, 0, 'droplet', {
            x: {min: -8, max: 8},
            quantity: 0.5,
            lifespan: 1400,
            gravityY: 200
        });

        this.container = this.scene.add.container(-9999, 0);
        this.container.add(this.emitter);

        this.container.setSize(0, 0);
        
        const hitAreaRect = new Phaser.GameObjects.Rectangle(this.scene, -20, 0, 230, 35);

        this.container.setVisible(true);

        this.hitArea = this.scene.add.existing(hitAreaRect);
        this.hitArea = this.scene.physics.add.existing(this.hitArea);
        this.hitArea.setOrigin(0, 0)
        this.container.add(this.hitArea);

        this.player = player;
    }

    getAngle(playerX: number, playerY: number, targetX: number, targetY: number) {
        const angleDeg = (Math.atan2(targetY - playerY, targetX - playerX) * 180 / Math.PI);

        return angleDeg;
    }

    shot(targetPosition: Phaser.Math.Vector2) {
        this.gunTargetPosition = targetPosition;
        this.isShooting = true;
    }

    update() {
        if (this.isShooting) {
            const angle = this.getAngle(this.player.sprite.x, this.player.sprite.y, this.gunTargetPosition.x, this.gunTargetPosition.y);
            this.container.setPosition(this.player.sprite.x, this.player.sprite.y - 30);
            this.container.setAngle(angle - 90);
        }
    }

    stopShooting() {
        this.container.setPosition(-9999, 0);
        this.isShooting = false;
    }
}

export default BathwaterGun;
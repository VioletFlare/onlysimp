import droplet from './../assets/droplet.png';
import Player from './Player';

class BathwaterGun {
    scene: Phaser.Scene;
    emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    player: Player;
    gunTargetPosition: Phaser.Math.Vector2;
    isShooting: boolean;
    container: Phaser.GameObjects.Container;
    hitAreaGroup: Phaser.GameObjects.Group;
    hitAreaRects: Array<Phaser.GameObjects.Rectangle>;

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
        this.hitAreaRects = [];

        this.container.setSize(0, 0);
        
        this.hitAreaGroup = this.scene.add.group();

        for (let i = 0; i < 5; i++) {
            const rect = new Phaser.GameObjects.Rectangle(this.scene, -9999, 0, 35, 35);

            this.hitAreaRects.push(this.scene.add.existing(rect));
            this.scene.physics.add.existing(rect);
            this.hitAreaGroup.add(rect);
        }

        this.container.setVisible(true);

        this.player = player;
    }

    getAngle(playerX: number, playerY: number, targetX: number, targetY: number) {
        const angleDeg = (Math.atan2(targetY - playerY, targetX - playerX) * 180 / Math.PI);

        return angleDeg;
    }

    getAngleRad(playerX: number, playerY: number, targetX: number, targetY: number) {
        const angleRad = Math.atan2(targetY - playerY, targetX - playerX);

        return angleRad;
    }

    hideRectGroupBody() {
        this.hitAreaGroup.setXY(-9999, 0);
    }

    showRectGroupBody() {
        const originX = this.player.sprite.x;
        const originY = this.player.sprite.y - 30;
        const angle = this.getAngleRad(originX, originY, this.gunTargetPosition.x, this.gunTargetPosition.y);
    
        const step = 35;
    
        for (let i = 0; i < this.hitAreaRects.length; i++) {
            const rect = this.hitAreaRects[i];
    
            const distance = (i + 1) * step;
            const x = originX + Math.cos(angle) * distance;
            const y = originY + Math.sin(angle) * distance;
    
            rect.setPosition(x, y);
    
            // Reset rotation and make sure physics body is aligned to new position
            if (rect.body) {
                (rect.body as Phaser.Physics.Arcade.Body).updateFromGameObject();
            }
        }
    }

    shot(targetPosition: Phaser.Math.Vector2) {
        this.gunTargetPosition = targetPosition;
        this.isShooting = true;
    }

    update() {
        if (this.isShooting) {
            const angle = this.getAngle(this.player.sprite.x, this.player.sprite.y, this.gunTargetPosition.x, this.gunTargetPosition.y);
            this.container.setPosition(this.player.sprite.x, this.player.sprite.y - 15);
            this.container.setAngle(angle - 89);
            this.showRectGroupBody();
        } else {
            this.hideRectGroupBody();
        }
    }

    stopShooting() {
        this.container.setPosition(-9999, 0);
        this.isShooting = false;
    }
}

export default BathwaterGun;
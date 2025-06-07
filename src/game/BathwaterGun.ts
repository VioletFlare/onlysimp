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

    //todo: fix the ray when the ray is oblique (45°) and then goes <45°
    showRectGroupBody() {

        for (let i = 0; i < this.hitAreaRects.length; i++) {
            const rect = this.hitAreaRects[i];

            const angle = this.getAngleRad(this.player.sprite.x, this.player.sprite.y, this.gunTargetPosition.x, this.gunTargetPosition.y);

            /*         Q1_1
            Q4 | Q1   |    o
            ---|---   |  o
            Q3 | Q2   |o______Q1_2
            */

            let x, y;

            if (-Math.PI / 2 <= angle && 0.0 >= angle) {
                //Q1
                if (-Math.PI / 2 <= angle && -Math.PI / 4 >= angle) {
                    //Q1_1
                    x = this.player.sprite.x - (i * (35 * (-angle - (Math.PI / 2))));
                    y = this.player.sprite.y - 30 - (i * 35);
                } else {
                    //Q1_2
                    x = this.player.sprite.x + (i * 35);

                    if (angle < -0.0001) {
                        y = this.player.sprite.y - 30 + (i * (35 * (angle / (Math.PI / 2))));
                    } else {
                        y = this.player.sprite.y - 30;
                    }
                }

            } else if (0.0 <= angle && Math.PI / 2 >= angle) {
                //Q2
            } else if (Math.PI / 2 <= angle && Math.PI >= angle) {
                //Q3
            } else if (-Math.PI / 2 >= angle) {
                //Q4
            }

            rect.setPosition(x, y);
        }
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
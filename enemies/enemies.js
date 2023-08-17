
export default class Skeleton extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, frame)
    {
        super(scene, x, y, texture, frame);
    }
    preload()
    {
        this.scene.load.atlas('skeleton', 'enemies/skeleton.png', 'enemies/skeleton.json');
    }

    create()
    {
        const skeleton = this.game.add.sprite(256, 256, 'skeleton', 'skelet_idle_anim_f0.png');
        this.game.anims.create
        ({
            key: 'skeleton-idle',
            frames: this.game.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_idle_anim_f', suffix: '.png'}),
            repeat: -1,
            frameRate: 10
        })

        this.game.anims.create
        ({
            key: 'skeleton-run',
            frames: this.game.anims.generateFrameNames('skeleton', {start: 0, end: 3, prefix: 'skelet_run_anim_f', suffix: '.png'}),
            repeat: -1,
            frameRate: 10
        })
        this.skeleton = this.game.add.sprite(x, y, 'skeleton');
        this.skeleton.anims.play('skeleton-idle')
    }
}


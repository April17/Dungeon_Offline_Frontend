export class Chest extends Phaser.Physics.Arcade.Sprite {
    name = "";
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, chestName: string) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.name = chestName
        scene.anims.create({
          key: `${chestName}-open`,
          frameRate: 5,
          frames: scene.anims.generateFrameNumbers(texture, {
            start: 334,
            end: 335
          }),
        });
    }
}

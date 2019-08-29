export class Slime extends Phaser.Physics.Arcade.Sprite {
  id = 0;
  name = "";
  level = 0;
  monster_type = "";
  exp_provide = 0;
  max_hp = 0;
  hp = 0;
  atk = 0;
  def = 0;
  respawn_cooldown = 3000;
  constructor(scene: Phaser.Scene, monsterInfo) {
    super(scene, monsterInfo.x, monsterInfo.y, monsterInfo.monster_type);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.id = monsterInfo.id
    this.name = monsterInfo.name;
    this.level = monsterInfo.level
    this.monster_type = monsterInfo.monster_type;
    this.exp_provide = monsterInfo.exp_provide;
    this.max_hp = monsterInfo.max_hp;
    this.hp = monsterInfo.hp;
    this.atk = monsterInfo.atk;
    this.def = monsterInfo.def;
    this.respawn_cooldown = monsterInfo.respawn_cooldown
    // debugger
    scene.anims.create({
      key: "slime-vetory",
      frameRate: 5,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 4,
        end: 6
      }),
      repeat: -1
    });
    ///////// Idel //////////////
    scene.anims.create({
      key: "slime-idel-down",
      frameRate: 5,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 0,
        end: 2
      }),
      repeat: -1
    });
    scene.anims.create({
      key: "slime-idel-up",
      frameRate: 5,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 43,
        end: 43
      })
    });
    scene.anims.create({
      key: "slime-idel-sideway",
      frameRate: 5,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 39,
        end: 39
      })
    });
    ///////// End Idel //////////////

    ///////// Attack //////////////
    scene.anims.create({
      key: "slime-attack-sideway",
      frameRate: 20,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start:24,
        end: 27
      })
    });
    scene.anims.create({
      key: "slime-attack-up",
      frameRate: 20,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 28,
        end: 31
      })
    });
    scene.anims.create({
      key: "slime-attack-down",
      frameRate: 20,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 19,
        end: 23
      })
    });
    ///////// End Attack //////////////

    ///////// Walk //////////////
    scene.anims.create({
      key: "slime-walk-sideway",
      frameRate: 10,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 12,
        end: 15
      }),
      repeat: -1
    });
    scene.anims.create({
      key: "slime-walk-up",
      frameRate: 10,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 16,
        end: 19
      }),
      repeat: -1
    });
    scene.anims.create({
      key: "slime-walk-down",
      frameRate: 10,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 8,
        end: 11
      }),
      repeat: -1
    });
    ///////// End Walk //////////////

    //////// Hit ///////////////
    scene.anims.create({
      key: "slime-hit-sideway",
      frameRate: 15,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 36,
        end: 39
      }),
    });
    scene.anims.create({
      key: "slime-hit-up",
      frameRate: 15,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 32,
        end: 35
      }),
    });
    scene.anims.create({
      key: "slime-hit-down",
      frameRate: 15,
      frames: scene.anims.generateFrameNumbers(monsterInfo.monster_type, {
        start: 40,
        end: 43
      }),
    });
    //////// End Hit ///////////////
  }
}

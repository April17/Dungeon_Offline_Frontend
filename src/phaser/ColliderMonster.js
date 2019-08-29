import { damageSystem, monsterSpawner } from './GameMechanic'

export class ColliderMonster {
  constructor (game, scene, hero, monster, world_layer, spawnPoint) {
    const monsterClassName = monster.constructor.name
    let monsterStatus = {id: monster.id, name: monster.name, monster_type: monster.monster_type, exp_provide: monster.exp_provide, max_hp: monster.max_hp, hp: monster.hp, atk: monster.atk, def: monster.def}
    scene.physics.world.addCollider(hero, monster, (hero: Hero, monster: monsterClassName) => {
     if (hero.attacking === true) {
       damageSystem(hero, monster)
       game.props.updateMonsterStatus({...monsterStatus, hp: monster.hp})
       game.props.monsterHpToggle("No-Space show")
       if (hero.body.facing === 13) {
         monster.flipX = false
         monster.anims.nextAnim = `${monster.monster_type}-idel-sideway`
         monster.anims.play(`${monster.monster_type}-hit-sideway`, true)
         monster.setX(monster.x - 8)
       } else if (hero.body.facing === 14) {
         monster.flipX = true
         monster.anims.nextAnim = `${monster.monster_type}-idel-sideway`
         monster.anims.play(`${monster.monster_type}-hit-sideway`, true)
         monster.setX(monster.x + 8)
       } else if (hero.body.facing === 11) {
         monster.flipX = false
         monster.anims.nextAnim = `${monster.monster_type}-idel-down`
         monster.anims.play(`${monster.monster_type}-hit-up`, true)
         monster.setY(monster.y - 8)
       } else if (hero.body.facing === 12) {
         monster.flipX = false
         monster.anims.nextAnim = `${monster.monster_type}-idel-up`
         monster.anims.play(`${monster.monster_type}-hit-down`, true)
         monster.setY(monster.y + 8)
       }
     } else {
       if (hero.hp > 50) {
         damageSystem(monster, hero)
         if (hero.hp < 50) {
           hero.hp = 50
         }
       }
       if (hero.body.facing === 13) {
         hero.flipX = true
         hero.anims.nextAnim = `idel-sideway`
         hero.anims.play(`hit-sideway`, true)
         hero.setX(hero.x + 8)
       } else if (hero.body.facing === 14) {
         hero.flipX = false
         hero.anims.nextAnim = `idel-sideway`
         hero.anims.play(`hit-sideway`, true)
         hero.setX(hero.x - 8)
       } else if (hero.body.facing === 11) {
         hero.flipX = false
         hero.anims.nextAnim = `idel-down`
         hero.anims.play(`hit-down`, true)
         hero.setY(hero.y + 8)
       } else if (hero.body.facing === 12) {
         hero.flipX = false
         hero.anims.nextAnim = `idel-up`
         hero.anims.play(`hit-up`, true)
         hero.setY(hero.y - 8)
       }
     }
     if (monster.hp < 0) {
       monster.destroy()
       game.props.monsterHpToggle("No-Space hide")
       game.props.requestItemDrop({monster_id: monster.id, character_id: hero.id})
       hero.exp = hero.exp + monster.exp_provide
       game.props.addLog({summary: `-${hero.name} obtain ${monster.exp_provide} EXP.`})
       hero.x = hero.x + 0.01
       setTimeout(function(){monsterSpawner(scene, game, monster, hero, world_layer, spawnPoint)}, monster.respawn_cooldown)
     }
   })
 }
}

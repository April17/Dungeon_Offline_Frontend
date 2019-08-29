import { Slime } from "./Slime"
import { ColliderMonster } from './ColliderMonster'
import Phaser from 'phaser'

let keyDown1 = true
let keyDown2 = true
let keyDown3 = true
let keyDown4 = true

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;

const keyMap = {
  "small_HP": {key: "ONE", keyDown: keyDown1, counter: counter1},
  "large_HP": {key: "TWO", keyDown: keyDown2, counter: counter2},
  "atk_potion": {key: "THREE", keyDown: keyDown3, counter: counter3},
  "super_atk_potion": {key: "FOUR", keyDown: keyDown4, counter: counter4}
}

export const levelSystem = (hero, game, key) => {
  if (hero.exp >= hero.exp_next_level) {
    hero.exp = hero.exp - hero.exp_next_level
    hero.exp_next_level = Math.round(hero.exp_next_level * (1+ hero.level/20))
    hero.level ++
    hero.max_hp = hero.max_hp + hero.level * 5
    hero.atk = Math.round(hero.atk + hero.level * 0.5)
    hero.def = hero.def + hero.level
    hero.hp = hero.max_hp
    game.props.addLog({summary: `-Congratulations! ${hero.name} is now Level ${hero.level}.`})
  }
}

export const damageSystem = (attacker, defender) => {
  let damageReduction = (defender.level/50) * defender.def
  let damage = 1
  if (attacker.atk > damageReduction ) {
    damage = attacker.atk - damageReduction
  }
  defender.hp = Math.round(defender.hp - damage)
  // console.log(`[${defender.name}] defender HP`, defender.hp);
  // console.log("attacker atk", attacker.atk);
  // console.log("damageReduction", damageReduction);
  // console.log("damage", damage);
}

export const monsterSpawner = (scene, game, monster, hero, world_layer, spawnPoint) => {
  monster.x = Phaser.Math.Between((spawnPoint.x-50), (spawnPoint.x+50))
  monster.y = Phaser.Math.Between((spawnPoint.y-50), (spawnPoint.y+50))
  monster.hp = monster.max_hp
  let currentMonster = new Slime(scene, monster).setSize(16, 16)
  new ColliderMonster(game, scene, hero, currentMonster, world_layer, spawnPoint)
  scene.physics.add.collider(currentMonster, world_layer);
}

export const itemKeyMap = (hero, item, cursors, heroStatus, game) => {
  if (item) {
    if (cursors[keyMap[item.item.icon_name].key].isDown && keyMap[item.item.icon_name].keyDown && item.quantity > 0){
      game.props.cooldownToggle({[item.item.icon_name]: true})
      if (item.item.key === "hp") {
        healthPotion(hero, item, game, heroStatus)
      } else if (item.item.key === "atk_boost") {
        atkPotion(hero, item, game, heroStatus)
      }
      keyMap[item.item.icon_name].keyDown = false
    }
  }
  if (cursors[keyMap[item.item.icon_name].key].isDown && keyMap[item.item.icon_name].keyDown === false) {
    if (keyMap[item.item.icon_name].counter === 0) {
      item.quantity --
      game.props.useItem({character_id: hero.id, item_id: item.item_id})
      setTimeout(function(){
        keyMap[item.item.icon_name].keyDown = true
        game.props.cooldownToggle({[item.item.icon_name]: false})
        keyMap[item.item.icon_name].counter = 0}, item.item.cooldown);
      keyMap[item.item.icon_name].counter ++
    }
  }
}


const atkPotion = (hero, item, game, heroStatus) => {
  hero.atk = hero.atk + item.item.status
  console.log(hero.at);
  game.props.updateHeroStatus({...heroStatus, atk: hero.atk})
}

const healthPotion = (hero, item, game, heroStatus) => {
  if (hero.hp < hero.max_hp) {
    hero.hp = hero.hp + item.item.status
  if (hero.hp > hero.max_hp) {
    hero.hp = hero.max_hp
  }
  game.props.updateHeroStatus({...heroStatus, hp: hero.hp})
  }
}

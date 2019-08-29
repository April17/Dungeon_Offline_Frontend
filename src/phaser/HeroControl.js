import { itemKeyMap } from './GameMechanic'
let prevX = 0;
let prevY = 0;

export const heroControl = (game, hero, cursors) => {
  let heroStatus = {id: hero.id,
                    name: hero.name,
                    level: hero.level,
                    exp_next_level: hero.exp_next_level,
                    exp: hero.exp,
                    max_hp: hero.max_hp,
                    hp: hero.hp,
                    atk: hero.atk,
                    def: hero.def,
                    x: hero.body.x.toFixed(0),
                    y: hero.body.y.toFixed(0)}
  hero.items = game.props.characterInfo.unique_character_owned_items
  const speed = 100;
  const prevVelocity = hero.body.velocity.clone();
  hero.body.setVelocity(0);
  hero.body.velocity.normalize().scale(speed);
  if (cursors.J.isDown) {
    hero.attacking = true
    if (hero.body.facing === 13) {
      hero.flipX = true
      hero.anims.nextAnim = "idel-sideway"
      hero.anims.play("attack-sideway", true).setSize(32, 16).setOffset(0, 16)
    } else if (hero.body.facing === 14) {
      hero.flipX = false
      hero.anims.nextAnim = "idel-sideway"
      hero.anims.play("attack-sideway", true).setSize(32, 16).setOffset(16, 16);
    } else if (hero.body.facing === 11) {
      hero.flipX = false
      hero.anims.nextAnim = "idel-up"
      hero.anims.play("attack-up", true).setSize(16, 32).setOffset(16, 0);
    } else if (hero.body.facing === 12) {
      hero.flipX = false
      hero.anims.nextAnim = "idel-down"
      hero.anims.play("attack-down", true).setSize(16, 32).setOffset(16, 16);
    }
  } else if (cursors.A.isDown) {
    hero.flipX = true
    hero.anims.play("walk-sideway", true);
    hero.body.setVelocityX(-speed);
    prevX = hero.body.x
  } else if (cursors.D.isDown) {
    hero.flipX = false
    hero.anims.play("walk-sideway", true);
    hero.body.setVelocityX(speed);
    prevX = hero.body.x
  } else if (cursors.W.isDown) {
    hero.setSize(16, 16)
    hero.flipX = false
    hero.anims.play("walk-up", true);
    hero.body.setVelocityY(-speed);
    prevY = hero.body.y
  } else if (cursors.S.isDown) {
    hero.flipX = false
    hero.anims.play("walk-down", true);
    hero.body.setVelocityY(speed);
    prevY = hero.body.y
  } else {
    if (prevVelocity.x < 0) {
      hero.flipX = true
      hero.anims.play("idel-sideway", true);
    } else if (prevVelocity.x > 0) {
      hero.flipX = false
      hero.anims.play("idel-sideway", true);
    } else if (prevVelocity.y < 0) {
      hero.flipX = false
      hero.anims.play("idel-up", true);
    } else if (prevVelocity.y > 0) {
      hero.flipX = false
      hero.anims.play("idel-down", true);
    }
  }
  if (cursors.J.isUp){
    hero.setSize(16, 16)
    hero.attacking = false
  }

  hero.items.forEach(function(item){
    itemKeyMap(hero, item, cursors, heroStatus, game)
  })

  if (cursors.A.isUp || cursors.D.isUp) {
    if (prevX !== hero.body.x) {
      game.props.updateHeroStatus({...heroStatus, x: hero.body.x.toFixed(0)})
      prevX = hero.body.x
    }
  }
  if (cursors.W.isUp || cursors.S.isUp) {
    if (prevY !== hero.body.y) {
      game.props.updateHeroStatus({...heroStatus, y: hero.body.y.toFixed(0)})
      prevY = hero.body.y
    }
  }
}

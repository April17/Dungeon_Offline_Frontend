export const slimeMovement = (game, slime, scene, hero) => {
  const prevVelocity = slime.body.velocity.clone();
  if (slime.body.velocity.x < 0 && slime.body.velocity.x < slime.body.velocity.y) {
    slime.flipX = true
    slime.anims.play("slime-walk-sideway", true);
  } else if (slime.body.velocity.x > 0 && slime.body.velocity.x > slime.body.velocity.y) {
    slime.flipX = false
    slime.anims.play("slime-walk-sideway", true);
  } else if (slime.body.velocity.y < 0 && slime.body.velocity.y < slime.body.velocity.x) {
    slime.setSize(16, 16)
    slime.flipX = false
    slime.anims.play("slime-walk-up", true);
  } else if (slime.body.velocity.y > 0 && slime.body.velocity.y > slime.body.velocity.x) {
    slime.flipX = false
    slime.anims.play("slime-walk-down", true);
  } else if(slime.body.checkCollision.none === false){
    slime.body.setVelocity(0, 0)
    if (prevVelocity.x < 0) {
      slime.flipX = true
      slime.anims.play("slime-idel-sideway", true);
    } else if (prevVelocity.x > 0) {
      slime.flipX = false
      slime.anims.play("slime-idel-sideway", true);
    } else if (prevVelocity.y < 0) {
      slime.flipX = false
      slime.anims.play("slime-idel-up", true);
    } else if (prevVelocity.y > 0) {
      slime.flipX = false
      slime.anims.play("slime-idel-down", true);
    }
  }
  // scene.physics.moveTo(slime, 300, 300, 10)
  // .then(scene.physics.moveTo(slime, 200, 300, 10))
}

export class ColliderObject {
  constructor (scene, hero, gameObject) {
    const className = gameObject.constructor.name
    scene.physics.world.addCollider(hero, gameObject, (hero: Hero, gameObject: className) => {
     if (hero.attacking === true) {
       gameObject.anims.play(`${gameObject.name}-open`, false)
     }
   })
 }
}

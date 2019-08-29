import React, { Component } from 'react'
import { connect } from "react-redux"
import { updateHeroStatus, useItem } from '../redux/adapters/heroStatusAdapters'
import { updateMonsterStatus, requestItemDrop } from '../redux/adapters/monsterStatusAdapters'
import { monsterHpToggle, uiToggle, cooldownToggle } from '../redux/adapters/utilityAdapters'
import { addLog } from '../redux/adapters/feedAdapters'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import { Header, Image, Grid } from 'semantic-ui-react'
import { Hero } from "../phaser/Hero"
import { Chest } from "../phaser/Chest"
import { heroControl } from '../phaser/HeroControl'
import { levelSystem, monsterSpawner } from '../phaser/GameMechanic'
import { ColliderObject } from '../phaser/ColliderObject'
import mapinfo from '../assets/active_resources/World.json'
import maptile from '../assets/active_resources/ts_dungeon.png'
import herotile from '../assets/active_resources/chara_hero.png'
import slimetile from '../assets/active_resources/chara_slime.png'
import dungeonSprites from '../assets/active_resources/tiles_dungeon_v1.png'
import xiaoLaJi2 from '../assets/active_resources/xiaolaji.gif'
import '../assets/style/Game.css'

let hero;
let cursors;
let that;
let currentScene

class Game extends Component {
  constructor(props) {
    super(props)
    that = this;
    this.state = {
      initialize: false,
      game: {
        width: 480,
        height: 270,
        type: Phaser.AUTO,
        physics: {
          default: "arcade",
          arcade: {
            debug: false
          }
        },
        render: {
          pixelArt: true
        },
        scene: {
          init: function() {
            this.cameras.main.setBackgroundColor('#000000')
          },
          preload: function(){
            this.load.image("ts-tiles", maptile);
            this.load.tilemapTiledJSON("map", mapinfo);
            this.load.spritesheet("hero", herotile, {frameHeight: 48, frameWidth: 48});
            this.load.spritesheet("slime", slimetile, {frameHeight: 48, frameWidth: 48});
            this.load.spritesheet("chest1", dungeonSprites, {frameHeight: 16, frameWidth: 16});
            // this.textures.addSpriteSheet("chest1", chest1Img, {frameHeight: 32, frameWidth: 32});
            // chest1Img.src = chesttile1
          },
          create: function() {
            currentScene = this
            ///////////// Map ///////////////////////
            const map = this.make.tilemap({ key: "map" });
            const tileset = map.addTilesetImage("ts_dungeon", "ts-tiles");
            map.createStaticLayer("bot_layer", tileset, 0, 0);
            const world_layer = map.createStaticLayer("world_layer", tileset, 0, 0);
            const top_layer = map.createStaticLayer("top_layer", tileset, 0, 0);
            world_layer.setCollisionByProperty({ collides: true });
            top_layer.setDepth(10);
            /////////// End Map /////////////////////

            /////////// Character ///////////////////
            hero = new Hero(this, "hero", that.props.characterInfo).setSize(16, 16)

            that.props.worldInfo.monsters.forEach(function(monster){
              const spawnPoint = {x: monster.x, y: monster.y}
              for (monster.population; monster.population <monster.population_cap; monster.population++) {
                monsterSpawner(currentScene, that, monster, hero, world_layer, spawnPoint)
              }
            })

            ////////// End Character ///////////////

            ////////// Object ///////////////
            const chest1 = new Chest(this, 450, 350, "chest1", "chest1").setFrame(334)
            ////////// End Object ///////////////

            ///////// Collider  ////////////////
            new ColliderObject(this, hero, chest1)
            this.physics.add.collider(hero, world_layer);
            ///////// End Collider  ////////////////

            ////////////// Window Object Debugger ////////////
            window.hero = hero
            window.scene = this
            window.game = that
            window.chest1 = chest1
            ////////////// End Window Object Debugger ////////////

            /////////// Camera and Controls ///////////////////
            const camera = this.cameras.main;
            camera.startFollow(hero);
            camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            cursors = this.input.keyboard.addKeys("W, A, S, D, J, ONE, TWO, THREE, FOUR");
            this.scale.setZoom(4.2)
            window.cursors = cursors
            /////////// End Camera and Controls ///////////////////
          },
          update: function(time, delta) {
            this.input.manager.keyboard.enabled = that.props.gameInputToggle
            heroControl(that, hero, cursors)
            // if (slime.active === true) {
            //   slimeMovement(that, slime, this, hero)
            // }
            levelSystem(hero, that)
          }
        }
      }
    }
  }

  componentDidMount() {
    if (!this.props.characterInfo.name || localStorage.token === "undefined") {
      this.props.routingProps.history.push("/profile")
    }
  }


  initializeGame = () => {
    this.setState({ initialize: true })
    this.props.uiToggle("frostglass show")
  }

  render() {
    if (!this.props.worldInfo.name) {
      return(
        <Grid columns={1} className="loading" >
          <Grid.Column >
            <Image src={xiaoLaJi2} wrapped />
            <Header className="textColor" as='h3'>Finding World for you.......</Header>
          </Grid.Column>
        </Grid>
      )
    }
    const { initialize, game } = this.state
    return (
      <div className="Game">
        <header className="Game-header">
          { !initialize &&
            <React.Fragment>
              <div onClick={this.initializeGame} id="gameInit" className="flex">
                <button className="massive ui red button play-button">
                  Play
                </button>
              </div>
            </React.Fragment>
          }
          <IonPhaser game={game} initialize={initialize} />
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characterInfo: state.status,
    worldInfo: state.worldInfo.worldInfo,
    gameInputToggle: state.utilityReducer.gameInputToggle
  }
}

const mapDispatchToProps = {
  updateHeroStatus,
  updateMonsterStatus,
  addLog,
  monsterHpToggle,
  uiToggle,
  requestItemDrop,
  useItem,
  cooldownToggle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);

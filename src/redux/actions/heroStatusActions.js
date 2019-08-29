export default {
  initGameAction: characterInfo => ({type: "INIT_GAME", payload: characterInfo}),
  updateHeroStatusAction: status => ({ type: "HERO_STATUS", payload: status }),
  useItem: itemData => ({type: "USE_ITEM", payload: itemData})
};

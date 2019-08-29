export default {
  updateMonsterStatusAction: status => ({ type: "MONSTER_STATUS", payload: status }),
  dropedItem: item => ({type: "ITEM_PICKUP", payload: item})
};

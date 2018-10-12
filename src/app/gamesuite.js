import imposter from './imposter';

let gameSuite = {
  globalPause: false,
  gameList: {},
  socketList: {},
  playerList: {},
  getNewGame: function(gameName) {
    switch(gameName) {
      case 'imposter':
        let gameState = {
          title: "imposter",
          inProgress: false,
          joinable: true,
          gameCode: generateGC(),
          players: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:"",10:""},
          playerct: 0,
          timers: {0:60,1:360},
          round: 0,
          phase: 0,
          starttime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          endtime: undefined,
          postpones: 0,
          scenario: "undefined",
          roles: {1:99,2:99,3:99,4:99,5:99,6:99,7:99,8:99,9:99,10:99},
          votes: {}
        };
        //imposter.assignRoles(gameState);
        return gameState;
    }
  },
  getGame: function() {
    let found = 0;
    let keys = Object.keys(this.gameList);
    for(let i = 0; i < keys.length; i++) {
      let g = this.gameList[keys[i]];
      if(g.gameCode == gc) {
        found = 1;
        return g;
      }
    }
    if(found == 0) {
      return "GameNotFound";
    }
  }
};
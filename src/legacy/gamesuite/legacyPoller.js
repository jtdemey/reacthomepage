import logger from '../logWriter';

export default class Poller {

    constructor(t, i) {
      this.tickUpdate = t;
      this.idleTickUpdate = i;
      this.baseClock = undefined;
      this.idleClock = undefined;
      this.paused = false;
    }
    
    startBase(delay) {
      this.baseClock = setInterval(() => { this.tickUpdate(); }, delay);
    }

    stopBase() {
      clearInterval(this.baseClock);
    }

    startIdle(delay) {
      this.idleClock = setInterval(() => { this.idleTickUpdate(); }, delay);
    }

    stopIdle() {
      clearInterval(this.idleClock);
    }
}
const ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
  PLAY: 'play',
  STOP: 'stop',
};

class DramKit {
  constructor() {
    this.keys = document.querySelectorAll('.js-key');
    this.audio = document.querySelectorAll('.js-audio');

    this.checkKey = this.checkKey.bind(this);

    this.init();
  }

  checkKey(evt, arr, action) {
    const code = evt.code.slice(-1).toLowerCase();
    if (evt.code.length === 4) {
      arr.forEach((item) => {
        const label = item.querySelector('.js-label')
          ? item.querySelector('.js-label').textContent.toLowerCase()
          : item.getAttribute('data-key');
        if (label === code) {
          switch (action) {
            case ACTION.ADD:
              item.classList.add('playing');
              break;
            case ACTION.REMOVE:
              item.classList.remove('playing');
              break;
            case ACTION.PLAY:
              item.currentTime = 0;
              item.play();
              break;
            case ACTION.STOP:
              item.addTextTrack(item);
              break;
          }
        }
      });
    }
  }

  init() {
    document.addEventListener('keydown', (evt) => {
      this.checkKey(evt, this.keys, ACTION.ADD);
      this.checkKey(evt, this.audio, ACTION.PLAY);
    });
    document.addEventListener('keyup', (evt) => {
      this.checkKey(evt, this.keys, ACTION.REMOVE);
      // this.checkKey(evt, this.audio, ACTION.STOP);
    });
  }
}

new DramKit();

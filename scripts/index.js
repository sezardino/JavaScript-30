const INITIAL = 90;

const TYPE = {
  HOURS: 'hours',
  MINUTES: 'minutes',
  SECONDS: 'seconds',
};

class Clock {
  constructor() {
    this.second = document.querySelector('.js-second');
    this.min = document.querySelector('.js-min');
    this.hour = document.querySelector('.js-hour');

    this.rotate();
    this.init();
  }

  rotate() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const hoursRotate = INITIAL + (hours / 12) * 360;
    const minutesRotate = INITIAL + (minutes / 60) * 360;
    const secondsRotate = INITIAL + (seconds / 60) * 360;
    this.hour.style.transform = `rotate(${hoursRotate}deg)`;
    this.min.style.transform = `rotate(${minutesRotate}deg)`;
    this.second.style.transform = `rotate(${secondsRotate}deg)`;
  }

  init() {
    setInterval(() => {
      this.rotate();
    }, 1000);
  }
}

new Clock();

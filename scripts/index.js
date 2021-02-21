class Canvas {
  constructor() {
    this.canvas = document.querySelector('#draw');
    this.isDrawing = false;
    this.direction = true;
    this.lastX = 0;
    this.lastY = 0;
    this.hue = 0;

    this.mousemoveHandler = this.mousemoveHandler.bind(this);

    this.setup();
    this.init();
  }

  setup() {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.lineWidth = '1px';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  draw(evt) {
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(evt.offsetX, evt.offsetY);
    this.ctx.stroke();
  }

  writePosition = (x, y) => {
    this.lastX = x;
    this.lastY = y;
  };

  changeColor() {
    this.hue++;
    if (this.hue >= 360) {
      this.hue = 0;
    }
  }

  changeLineWidth() {
    if (this.ctx.lineWidth >= 300 || this.ctx.lineWidth <= 1) {
      this.direction = !this.direction;
    }

    if (this.direction) {
      this.ctx.lineWidth++;
    } else {
      this.ctx.lineWidth--;
    }
  }

  mousemoveHandler(evt) {
    if (this.isDrawing) {
      this.draw(evt);
      this.writePosition(evt.offsetX, evt.offsetY);
      this.changeColor();
      this.changeLineWidth();
    }
  }

  init() {
    this.canvas.addEventListener('mousedown', (evt) => {
      this.isDrawing = true;
      this.writePosition(evt.offsetX, evt.offsetY);

      this.canvas.addEventListener('mousemove', this.mousemoveHandler);

      this.canvas.addEventListener('mouseup', () => {
        this.isDrawing = false;
      });
      this.canvas.addEventListener('mouseleave', () => {
        this.isDrawing = false;
      });
    });
  }
}

new Canvas();

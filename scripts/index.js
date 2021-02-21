class FlexiblePanels {
  constructor() {
    this.panels = document.querySelectorAll('.panel');

    this.init();
  }

  clickHandler() {
    this.classList.toggle('open');
  }

  transitionendHandler(evt) {
    if (evt.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  }

  init() {
    this.panels.forEach((item) => {
      item.addEventListener('click', this.clickHandler);
      item.addEventListener('transitionend', this.transitionendHandler);
    });
  }
}

new FlexiblePanels();

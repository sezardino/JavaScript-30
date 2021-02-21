class Filter {
  constructor() {
    this.inputs = document.querySelectorAll('.controls input');
    this.image = document.querySelector('img');

    this.changeValueHandler = this.changeValueHandler.bind(this);

    this.init();
  }

  changeValueHandler(evt) {
    const value = evt.target.value;
    const name = evt.target.name;
    const suffix = evt.target.dataset.sizing || '';
    document.documentElement.style.setProperty(
      `--${name}`,
      `${value}${suffix}`
    );
  }

  init() {
    this.inputs.forEach((item) =>
      item.addEventListener('input', this.changeValueHandler)
    );
  }
}

new Filter();

class CBField {
  constructor() {
    this.inputs = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    this.firstEl = null;

    this.inputClickHandler = this.inputClickHandler.bind(this);

    this.init();
  }

  checkBoxes(element) {
    const firstIndex = this.inputs.findIndex((item) => item === element);
    const secondIndex = this.inputs.findIndex((item) => item === this.firstEl);
    this.inputs.map((item, index) => {
      if (
        (index >= firstIndex && index <= secondIndex) ||
        (index <= firstIndex && index >= secondIndex)
      ) {
        item.setAttribute('checked', '');
      }
    });
  }

  inputClickHandler(evt) {
    const isShiftPress = evt.shiftKey;
    const target = evt.target;

    if (this.firstEl && isShiftPress) {
      this.checkBoxes(target);
    } else {
      this.firstEl = target;
    }
  }

  init() {
    this.inputs.forEach((item) => {
      item.addEventListener('click', this.inputClickHandler);
    });
  }
}

new CBField();

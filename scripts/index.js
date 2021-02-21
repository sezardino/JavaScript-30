class Api {
  constructor() {
    this.url =
      'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  }

  async getData() {
    const data = fetch(this.url)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return data;
  }
}

const templates = {
  results: (data, value) => {
    const regExp = new RegExp(value, 'gi');
    const city = data.city.replace(regExp, `<span class="hl">${value}</span>`);
    const state = data.state.replace(
      regExp,
      `<span class="hl">${value}</span>`
    );
    return `<li><span class="name">${city}, ${state}</span> <span class="population">${data.population}</span></li>`;
  },
  noResults: () => `<li>There are</li><li>no results</li>`,
};

class States {
  constructor() {
    this.input = document.querySelector('.search');
    this.list = document.querySelector('.suggestions');
    this.data = [];

    this.inputHandler = this.inputHandler.bind(this);

    this.init();
  }

  renderResults(results) {
    this.list.innerHTML = '';
    if (results.length === 0) {
      this.list.innerHTML = templates.noResults();
    } else {
      const html = results.map((data) => templates.results(data, this.value));
      this.list.innerHTML = html.join('');
    }
  }

  inputHandler(evt) {
    this.value = evt.target.value.toLowerCase();
    const filteredArr = this.data.filter(
      (item) =>
        item.city.toLowerCase().includes(this.value) ||
        item.state.toLowerCase().includes(this.value)
    );
    this.renderResults(filteredArr);
  }

  init() {
    new Api().getData().then((data) => this.data.push(...data));

    this.input.addEventListener('input', this.inputHandler);
  }
}

const states = new States();

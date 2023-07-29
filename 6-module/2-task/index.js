export default class ProductCard {
  elem = null;
  #list;
  constructor(product) {
    this.#list = product;

    this.elem = this.#render();
  }
  #createElement(template) {
    const tmp = document.createElement('div');
    tmp.innerHTML = template;

    return tmp.firstElementChild;
  }

  #template() {
    return `
      <div id="${this.#list.id}" class="card">
        <div class="card__top">
          <img src="../../assets/images/products/${this.#list.image}" class="card__image" alt="product">
          <span class="card__price">€${this.#list.price}.00</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.#list.name}</div>
          <button type="button" class="card__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
  }

  #render() {
    this.elem = this.#createElement(this.#template());

    this.elem.addEventListener('click', this.#clickButtonEvent)

    return this.elem;
  }

  #clickButtonEvent = (e) => {
    let button = e.target.closest('.card__button');

    if (!button) {
      return;
    }

    const event = new CustomEvent("product-add", { 
      detail: this.#list.id,
      bubbles: true 
    });

    this.elem.dispatchEvent(event)
  }
}
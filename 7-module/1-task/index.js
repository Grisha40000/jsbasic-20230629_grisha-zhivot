import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  #ribbonArrowLeft;
  #ribbonArrowRight;

  #ribbonInner;


  constructor(categories) {
    this.categories = categories;

    this.elem = this.#render();

    this.#ribbonInner = this.elem.querySelector('.ribbon__inner')
    this.#ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left').addEventListener('click', this.#buttonClickLeft); 
    this.#ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right').addEventListener('click', this.#buttonClickRight);
  }

  #createElement(template) {
    const tmp = document.createElement('div');

    tmp.innerHTML = template;

    return tmp.firstElementChild;
  }

  #template() {
    return `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
        ${ this.categories.map(item => `
          <a href="#" class="ribbon__item ribbon__item_active" data-id="${item.id}">${item.name}</a>
        `)}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());

    this.elem.addEventListener('dragstart', this.#onDragStart);

    this.elem.querySelectorAll('.ribbon__item').forEach(item => {
      item.addEventListener('click', this.#clickLink)
  
    })

    return this.elem
  }
  
  #buttonClickRight = () => {
    this.#ribbonInner.scrollBy(350, 0);
    
    document.addEventListener( "scrollend", (evt) => {
      let scrollWidth = this.#ribbonInner.scrollWidth;
      let scrollLeft = this.#ribbonInner.scrollLeft;
      let clientWidth = this.#ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if(scrollRight < 1) {
        this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      }
      else if( scrollRight !== 0 ) {
        this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      }
    }, 500)



  }
  #buttonClickLeft = () => {
    this.#ribbonInner.scrollBy(-350, 0);

    document.addEventListener( "scrollend", (evt) => {
      let scrollWidth = this.#ribbonInner.scrollWidth;
      let scrollLeft = this.#ribbonInner.scrollLeft;
      let clientWidth = this.#ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;   

      if(scrollLeft == 0) {
        this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      }
      else if( scrollLeft !== 0 ) {
        this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }
    }, 500)

  }

  #onDragStart = (event) => {
    event.preventDefault();
  };
  
  #clickLink = (e) => {
    this.elem.querySelectorAll('.ribbon__item').forEach(item => {

      item.addEventListener('click', (e) => {
        this.elem.querySelectorAll('.ribbon__item').forEach(el => {

          el.classList.remove('ribbon__item_active');
        });

        item.classList.add('ribbon__item_active');
      })
    });

    let link = e.target.closest('.ribbon__item').dataset.id;

    const event = new CustomEvent('ribbon-select', { 
      detail: link,
      bubbles: true 
    })
    
    this.elem.dispatchEvent(event);
  }
}

document.body.addEventListener('ribbon-select', ({detail}) => {
  console.log(detail);
});

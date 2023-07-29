import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  #block;

  #count = 0;
  #width = 500;
  #buttonLeft;
  #buttonRight;
  #carouselInner;
  #carousell;

  constructor(slides) {
    this.slides = slides;
    
    this.elem = this.#render();

    this.#carousell = document.querySelector('.carousel');

    this.elem.querySelector('.carousel__arrow_left').style.display = 'none'

    this.#buttonLeft = this.elem.querySelector('.carousel__arrow_left').addEventListener('click', this.#buttonClickLeft);

    this.#buttonRight = this.elem.querySelector('.carousel__arrow_right').addEventListener('click', this.#buttonClickRight);
    
    this.#carouselInner = this.elem.querySelector('.carousel__inner');



    window.addEventListener('resize', this.#init);
    
    
  }

  #createElement(template) {
    const tmp = document.createElement('div');
    tmp.innerHTML = template;

    return tmp.firstElementChild;
  }

  #template() {
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
        ${this.slides.map(item => 
          `
        <div class="carousel__slide" data-id="${item.id}">
            <img src="../../assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${item.price}.00</span>
              <div class="carousel__title">${item.name}</div>
              <button type="button" class="carousel__button">
                <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
          `
          )}

      </div>
    </div>
     
    `
  }

  #render() {
    this.elem = this.#createElement(this.#template());
    this.elem.querySelectorAll('.carousel__button').forEach(item => {
      item.addEventListener('click', this.#clickButtonEvent);
    })

    return this.elem;
  }

  #init = () => {
      this.#width = document.querySelector('.carousel').offsetWidth;
      this.#carouselInner = this.#width + 'px';
      const slides = this.elem.querySelectorAll('.carousel__slide');
  
      slides.forEach((slide) => {
        slide.style.width = this.#width + 'px';
        let img = slide.querySelector('.carousel__img');
  
        if (img) {
          img.style.width = this.#width + 'px';
        }
      })
  }
  #buttonClickRight = () => { 
      this.#init()
      this.#count += 1;
      this.elem.querySelector('.carousel__inner').style.transform = 'translateX(-' + this.#count * this.#width + 'px)';
      
      if(this.#count == this.slides.length - 1) {
        this.elem.querySelector('.carousel__arrow_right').style.display = 'none';
      }
      else if(this.#count !== 0) {
        this.elem.querySelector('.carousel__arrow_left').style.display = '';
      }
    
  }

  #buttonClickLeft = () => { 
    this.#init()   
      this.#count -= 1;
      this.elem.querySelector('.carousel__inner').style.transform = 'translateX(-' + this.#count * this.#width + 'px)';

      if(this.#count == 0) {
        this.elem.querySelector('.carousel__arrow_left').style.display = 'none';
      }
      else if(this.#count !== 3) {
        this.elem.querySelector('.carousel__arrow_right').style.display = '';
      }
  
  }

  #clickButtonEvent = (e) => {
    let buttonEvent = e.target.closest('.carousel__button');

    this.#block = buttonEvent.closest('div[data-id]').dataset.id;
    
    if(!buttonEvent) {
      return;
    }

    const event = new CustomEvent("product-add", {
      
      detail: this.#block, 
      bubbles: true
    })
    
    this.elem.dispatchEvent(event)
    
  }
}

document.body.addEventListener('product-add', ({detail}) => {
  console.log(detail);
});
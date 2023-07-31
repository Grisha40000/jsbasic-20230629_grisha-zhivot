export default class StepSlider {
  elem = null;
  steps;
  value;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;


    
    this.elem = this.#render();
    
    this.#push()
    this.elem.querySelector('.slider__thumb').ondragstart = () => false;
    

  }

  #createElement(template) {
    const tmp = document.createElement('div');

    tmp.innerHTML = template;

    return tmp.firstElementChild;
  };

  #template() {
    return `
    <div class="slider">


    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
      
    </div>
  </div>
    `
  }
  
  #render() {
    this.elem = this.#createElement(this.#template());

    this.elem.addEventListener('dragstart', this.#onDragStart);

    this.elem.addEventListener('click', this.#clickSpan);
    this.elem.addEventListener('click', this.#classSpan);

    this.elem.addEventListener('pointerdown', this.#onDown)
 
    return this.elem;
  }

  #push() {
    let sliderSteps = this.elem.querySelector('.slider__steps')
    let a;

    for(let i = 0; i < this.steps; i+= 1) {
      a = document.createElement('span');
        
      
      sliderSteps.append(a)
    }
    let span1 = this.elem.querySelector('.slider__steps span');
    span1.classList.add('slider__step-active');
  }
  #clickSpan = ({clientX}) => {
    let sliderValue = this.elem.querySelector('.slider__value');

    let span = this.elem.querySelectorAll('.slider__steps span')

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress') ;

    
    let segments = this.steps - 1;


    this.value = this.#value(clientX)

    let valuePercents = this.value / segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    sliderValue.textContent = this.value;

    const event = new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 

    })
    
    this.elem.dispatchEvent(event);


  }

  #classSpan = ({clientX}) => {
    let span = this.elem.querySelectorAll('.slider__steps span')
    this.value = this.#value(clientX)

    let count = 0;
    span.forEach(item => {
      

      this.elem.querySelector('.slider__steps').addEventListener('click', (e) => {
        this.elem.querySelectorAll('.slider__steps span').forEach(el => {

          el.classList.remove('slider__step-active');
        });
      });

      if(count == this.value) {
        item.classList.add('slider__step-active');
      }

      count++;
    });
  }
  #value = (clientX) =>{
    let left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    this.value = Math.round(approximateValue);

    if(this.value > segments) {
      return this.value = segments;
    }
    else if(this.value < 0) {
      return this.value = 0;
    }

    return this.value;
    
  }
  #onDragStart = (e) => {
    e.preventDefault();
  }

  #onDown = () => {
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, { once: true });
  }

  #onMove = ({pageX, clientX}) => {
    let slider = document.querySelector('.slider');
    let sliderValue = this.elem.querySelector('.slider__value');
    let width = this.elem.offsetWidth;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    


    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.value = this.#value(clientX)
    
    
    // thumb.style.left = `${pageX - width / 4}px`;
    // progress.style.width = `${pageX - width / 4}px`;

    slider.classList.add('slider_dragging');
    sliderValue.textContent = this.value;

    // if( (pageX - width / 4) > width) {
    //   thumb.style.left = `${width}px`;
    //   progress.style.width = `${width}px`;
    // }
    // else if((pageX - width / 4) < 0) {
    //   thumb.style.left = `${0}px`;
    //   progress.style.width = `${0}px`;
    // }
  }

  #onUp = () => {
    let slider = document.querySelector('.slider');

    document.removeEventListener('pointermove', this.#onMove);

    slider.classList.remove('slider_dragging');

    const event = new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 

    })
    this.elem.dispatchEvent(event);
  }
}
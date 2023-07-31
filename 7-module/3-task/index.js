export default class StepSlider {
  elem = null;
  steps;
  value;


  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    // this.#arr = this.#arrPush()
    
    this.elem = this.#render();
    
    this.#push()

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

    this.elem.addEventListener('click', this.#click);
    this.elem.addEventListener('click', this.#classSpan);

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
  #click = (e) => {
    let sliderValue = this.elem.querySelector('.slider__value');

    let span = this.elem.querySelectorAll('.slider__steps span')

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress') ;

    let left = e.clientX - this.elem.getBoundingClientRect().left;
    
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    this.value = Math.round(approximateValue);

    let valuePercents = this.value / segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    sliderValue.textContent = this.value;

    const event = new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 

    })

    this.elem.dispatchEvent(event)
  }

  #classSpan = (e) => {
    let span = this.elem.querySelectorAll('.slider__steps span')


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
}

import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.#render();

  }

  #createElement(template) {
    const tmp = document.createElement('div');

    tmp.innerHTML = template;

    return tmp.firstElementChild;
  }



  setBody(block) {
    return block;
  }

  #template() {
    return `
    <div class="modal ">

      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            ${this.setTitle}
          </h3>
        </div>

        <div class="modal__body">
          ${this.setBody}
        </div>
      </div>

    </div>
    `
  }
  setTitle(str) {
    let title = this.elem.querySelector('.modal__title');

    title.textContent = str;
  }
  #render() {
    this.elem = this.#createElement(this.#template());

    this.elem.querySelector('.modal__close').addEventListener('click', this.#coverButton);

    document.addEventListener('keydown', this.#onkeydown)
    return this.elem;
  }



  setBody(block) {
    let modalBody = this.elem.querySelector('.modal__body');
    
    modalBody.firstChild.remove();
    modalBody.appendChild(block) ;
  }
  open = () => {


    
    document.body.classList.add('is-modal-open')
    document.body.append(this.elem)
  }

  close = () => {
    

    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  #coverButton = () => {


    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  #onkeydown = ({ key, code }) => {


    if(code == 'Escape'){
      document.body.classList.remove('is-modal-open')

      this.elem.remove();
    }
  }
}

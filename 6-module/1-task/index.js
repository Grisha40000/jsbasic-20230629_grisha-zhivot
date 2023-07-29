/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  
  #list = [];

  constructor(rows) {
    
    this.#list = rows || this.#list;
    
    this.elem = this.#render();
  }
  
  #createElement(template) {
    const tmp = document.createElement('div');
    tmp.innerHTML = template;
    return tmp.firstElementChild;
  }

  #template() {
    return `
      <div data-component="MenuComponent" class="table">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          ${
            this.#list.map(item => 
              `<tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.salary}</td>
                <td>${item.city}</td>
                <td><button class="button__remove">X</button></td>
              </tr>`
            )
          }
          </tbody>
        </table>
      </div>
    `;
   }
  
  #render() {
    this.elem = this.#createElement(this.#template());
    
    this.elem.addEventListener('click', this.#clickRemove)
   
    return this.elem;
  }

  #clickRemove = (e) => {
    let button = e.target.closest('.button__remove');

    if (!button) {
      return;
    }

    button.parentElement.parentElement.remove();

  }
}


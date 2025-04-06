// src/view/CreateForm.js
export default class CreateForm {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const form = document.createElement('form');
    form.className = 'create-form';
    form.innerHTML = `
          <h2>Создать новый элемент</h2>
          <input type="text" placeholder="Название" required />
          <button type="submit">Создать</button>
      `;
    return form;
  }

  render() {
    return this.element;
  }
}

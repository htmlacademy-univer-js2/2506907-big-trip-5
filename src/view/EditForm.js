// src/view/EditForm.js
export default class EditForm {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.innerHTML = `
          <h2>Редактировать элемент</h2>
          <input type="text" placeholder="Новое название" required />
          <button type="submit">Сохранить</button>
      `;
    return form;
  }

  render() {
    return this.element;
  }
}

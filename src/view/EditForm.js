// src/view/EditForm.js
export default class EditForm {
  constructor(data) {
    this.data = data; // Данные для редактирования
    this.element = this.createElement();
  }

  createElement() {
    const div = document.createElement('div');
    div.innerHTML = `
        <h2>${this.data ? 'Редактировать' : 'Создать'} точку маршрута</h2>
        <form>
            <label>Тип: <input type="text" value="${this.data ? this.data.type : ''}" /></label>
            <label>Город: <input type="text" value="${this.data ? this.data.destination.cityName : ''}" /></label>
            <label>Описание: <textarea>${this.data ? this.data.destination.description : ''}</textarea></label>
            <h4>Опции:</h4>
            <!-- Здесь можно добавить логику для добавления опций -->
            <button type="submit">Сохранить</button>
        </form>
    `;
    return div;
  }
}

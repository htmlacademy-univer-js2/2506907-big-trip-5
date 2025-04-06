// src/view/EditForm.js
export default class EditForm {
  constructor(data) {
    this.data = data;
  }

  get template() {
    return `
        <form class="edit-form">
            <!-- Поля для редактирования -->
            <button type="submit">Save</button>
        </form>
    `;
  }
}

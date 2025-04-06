import Presenter from './Presenter.js';

const appContainer = document.getElementById('app');
const presenter = new Presenter(appContainer);
presenter.init();

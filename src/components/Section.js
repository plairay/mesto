
export default class Section {
    constructor({ renderer }, cardSelector) {
        this._renderer = renderer;
    
        this._container = document.querySelector(cardSelector);
    }

    renderItems(cards) {
        cards.forEach(item => this._renderer(item));
    }
    
    addItem(element) {
        this._container.prepend(element);
    }

}
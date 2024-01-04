import { notNull } from '../../helpers/notNull.js';

export class Cart {
    constructor({id, products }) {
        this.id = notNull(id, 'id');
        this.products = products
    }

    asPOJO() {
        return {
            id: this.id,
            products: this.products,
        };
    }
}

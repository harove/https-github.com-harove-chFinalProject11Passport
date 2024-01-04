import { notNegative } from '../../helpers/notNegative.js';
import { notNull } from '../../helpers/notNull.js';

export class Product {
    constructor({id, code, title, description, price, thumbnails = [], status = true,  stock = 0, category }) {
        this.id = notNull(id, 'id');
        this.title = notNull(title, 'title');
        this.description = notNull(description, 'description');
        this.code = notNull(code, 'code');
        this.price = notNull(notNegative(price, 'price'));
        this.status = status
        this.stock = notNull(notNegative(stock, 'stock'));
        this.category = notNull(notNegative(category, 'stock'));
        this.thumbnails = thumbnails        
    }

    asPOJO() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            code: this.code,
            price: this.price,
            status: this.status,
            stock: this.stock,
            category: this.category,
            thumbnails: this.thumbnails,
        };
    }
}

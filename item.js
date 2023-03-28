const items = require("./fakeDB")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }


    static findAll() {
        return items
    }

    static update(name, data) {
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        foundItem.name = data.name;
        foundItem.price = data.price

        return foundItem;

    }

    static find(name) {
        const foundItem = items.find(data => data.name === name);
        if (foundItem === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        return foundItem;
    }

    static delete(name) {
        const foundIdx = items.find(data => data.name === name);
        if (foundIdx = -1) {
            throw { message: "Not Found", status: 404 }
        }
        items.splice(foundIdx, 1)

    }
}

module.exports = Item;
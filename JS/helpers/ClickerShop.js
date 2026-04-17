export class ClickerShop {
    constructor(shopItem) {
        this.shopItem = shopItem;
        this.shopType = shopItem.getAttribute("data-name");
    }
    getCost() {
        return Number(localStorage.getItem(this.shopType + "Cost") | this.shopItem.getAttribute("data-cost"));
    }
    setCost(newCost) {
        localStorage.setItem(this.shopType + "Cost", newCost);
    }
}
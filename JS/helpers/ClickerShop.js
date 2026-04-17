export class ClickerShop {
    constructor(shopItem) {
        this.shopItem = shopItem;
        this.shopType = shopItem.getAttribute("data-name");
        this.shopName = shopItem.getAttribute("data-name-readable");
    }
    getCost() {
        return Number(localStorage.getItem(this.shopType + "Cost") | this.shopItem.getAttribute("data-cost"));
    }
    setCost(newCost) {
        localStorage.setItem(this.shopType + "Cost", newCost);
    }
}
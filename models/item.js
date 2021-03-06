const Item = (function(){

  let id = 0;

  return class {
    constructor(linkURL, imgURL, description, time, price, place, seller){
      this.id = id++;
      this.linkURL = linkURL;
      this.imgURL = imgURL;
      this.description = description;
      this.time = time;
      this.price = price;
      this.place = place;
      this.seller = seller;
      store.items = [...store.items, this];
    }};

}());

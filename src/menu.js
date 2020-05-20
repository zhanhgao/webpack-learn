// export default class Menu{
//   constructor(){
//     this.display = 'none';
//   }
//   show(){
//     this.display = 'block';
//     console.log('Menu.show');
//   }
//   hide(){
//     this.display = 'none';
//     console.log('Menu.hide');
//   }
//   isShow(){
//     console.log('Menu.isShow');
//     return this.display === 'block';
//   }
// }

function Menu() {
  console.log('Menu');
}

Menu.prototype.show = function() {
    console.log('Menu.prototype.show');
}

Array.prototype.unique = function() {
  console.log('Array.prototype.unique');
}

export default Menu;
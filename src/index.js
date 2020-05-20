import {post} from './util.js';
import Menu from './menu.js';
import './style.css';


let foo=()=>{
    let x=1;
    if(false){          //sharking
      console.log('never reached');
    }
    let a=3;
    return a
  }
  let baz=()=>{
    post();
    // let menu = new Menu();
    // menu.show();
    
    var x=1;console.log(x);
    function unused(){  //sharking
      return 5
    }
    return x
    let c= x+3; //sharking
    return c        //sharking
  }
  baz();
  
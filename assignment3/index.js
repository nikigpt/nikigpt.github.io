// // Initialize Firebase
// var config = {
// apiKey: "AIzaSyBhHDLrWzsXvGAXnDb-ClLN97C_A4hNTJ4",
// authDomain: "food-menu-app-cf5f2.firebaseapp.com",
// databaseURL: "https://food-menu-app-cf5f2.firebaseio.com",
// projectId: "food-menu-app-cf5f2",
// storageBucket: "",
// messagingSenderId: "326618778484"
// };
// firebase.initializeApp(config);
// // get elements
// var preobject =  document.getElementById('demo');
// var str = '';
// // create refrences
// var dbRefObject = firebase.database().ref('menu');
// // sync object changes
// var getObj = null;
// var priceArr = [];
// var nameArr = [];
// dbRefObject.on('value', snap => {
// getObj = snap.val();
//   for(var i = 0; i < getObj.length; i++){
//   str += '<div class="wrap" id="' + getObj[i].id +  ' ">' +
//     '<div class="img-wrap">' +
//     '<img src=' + getObj[i].image + '></div>' +
//     '<div class="title">' + getObj[i].name + '</div>' +
//     '<div class="price"> &#x20b9;' +  getObj[i].price +'</div>' +
//     '<a href="#" onclick=addToOrder("'+i+'") class="add-order">Add to order</a>' + 
//     '</div>' 
//     preobject.innerHTML = str;
//     }
//   });
//   function addToOrder(index){
    
//     var dbRefObject = firebase.database().ref('menu/'+index);
//     dbRefObject.on('value', snap => {
//     var getObj = snap.val();

//     var cartMain =  document.getElementById('cart-wrap');
//     var cart = document.getElementById('cart-box');
//     var cartName = document.createElement('div');
//     var cartPrice = document.createElement('div');
//     var subtotalWrap = document.getElementById('subtotal');
    
//     var minus = document.createElement('input');
//     var plus = document.createElement('input');
//     var count = document.createElement('input');
//     var quantityWrap = document.createElement('div');
//     var cartParent = document.createElement('div');
//     quantityWrap.className = 'clearfix quantity';
//     var k = 0;
//     var test = cart.getElementsByClassName('cart-parent');
//     console.log(test.length);
//     for (var k = 0; k < test.length; k++) {
//       console.log(test[k]);
//     test[k].setAttribute('id',k);

//     }



//     count.className = 'count';
//     count.setAttribute('value', '');
//     count.setAttribute('type', 'text');
//     count.setAttribute('placeholder', 'Quantity');
    
//     quantityWrap.appendChild(count);
    
//     cartParent.className = 'cart-parent';

//     cart.className = 'cart clearfix';
//     cartName.className = 'cart-name';
//     cartPrice.className = 'cart-price';
//     cartPrice.innerHTML =  getObj.price;
//     cartName.innerHTML = getObj.name;

//     cartParent.appendChild(cartName);
//     cartParent.appendChild(quantityWrap);
//     cartParent.appendChild(cartPrice);
//     cart.appendChild(cartParent);
    
  
    
   

//     priceArr.push(getObj.price);
//     var sum = 0;
//       for (var i = 0; i < priceArr.length; i++) {
//       sum += priceArr[i];
//       subtotalWrap.innerHTML = 'Subtotal ' + '<span class="amount"> &#x20b9;' + sum + '</span>';

//       // checkout process

//       var checkout = document.getElementById('check-out');
      
//       var idArr = [];
      
//       checkout.style.display = 'block';
//        checkout.addEventListener('click', function(){
//              var myFirebase = firebase.database().ref();
//              var newarry = myFirebase.child("orders");
//              newarry.push({name: getObj.name});
//         });    
    
//     }
//   });
//   }
//   var loginLink =document.getElementById("loginLink");

// loginLink.addEventListener('click', function(){
// window.open('signup.html');
// });
  

//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log("hiiii");
//     // User is signed in.
//   } else {
//     console.log("yooo");
//     // No user is signed in.
//   }
// });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    if (user != null) {
  email = user.email;
    console.log(email);
  
}

  } else {
      console.log("yooo");
      // No user is signed in.
  }
});
function signIn(){
    var useremail =document.getElementById("emailLg").value;
    var userpassword =document.getElementById("passwordLg").value;
    firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
    console.log(useremail);

  // ...
  window.alert(errorMessage);
});
  }

function signUp(){
    var emailSg =document.getElementById("emailSg").value;
    var passwordSg =document.getElementById("passwordSg").value;

    firebase.auth().createUserWithEmailAndPassword(emailSg, passwordSg).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
  }
  // function logout(){
  //   firebase.auth().signOut();
  // }
// Initialize Firebase
// var config = {
// apiKey: "AIzaSyBhHDLrWzsXvGAXnDb-ClLN97C_A4hNTJ4",
// authDomain: "food-menu-app-cf5f2.firebaseapp.com",
// databaseURL: "https://food-menu-app-cf5f2.firebaseio.com",
// projectId: "food-menu-app-cf5f2",
// storageBucket: "",
// messagingSenderId: "326618778484"
// };
// firebase.initializeApp(config);
// get elements
var preobject =  document.getElementById('demo');
var str = '';
// create refrences
var dbRefObject = firebase.database().ref('menu');
// sync object changes
var getObj = null;
var priceArr = [];
var nameArr = [];
dbRefObject.on('value', snap => {
getObj = snap.val();
  for(var i = 0; i < getObj.length; i++){
  str += '<div class="wrap" id="' + getObj[i].id +  ' ">' +
    '<div class="img-wrap">' +
    '<img src=' + getObj[i].image + '></div>' +
    '<div class="title">' + getObj[i].name + '</div>' +
    '<div class="price"> &#x20b9;' +  getObj[i].price +'</div>' +
    '<a href="#" onclick=addToOrder("'+i+'") class="add-order">Add to order</a>' + 
    '</div>' 
    preobject.innerHTML = str;
    }
  });


    var crtParent = document.getElementsByClassName('cart-parent');
    var quantity = document.getElementsByClassName('count');
    var currentPrice = document.getElementsByClassName('cart-price');

  function addToOrder(index){
    
    var dbRefObject = firebase.database().ref('menu/'+index);
    dbRefObject.on('value', snap => {
    var getObj = snap.val();

    var cartMain =  document.getElementById('cart-wrap');
    var cart = document.getElementById('cart-box');
    var cartName = document.createElement('div');
    var cartPrice = document.createElement('div');
    var subtotalWrap = document.getElementById('subtotal');
    
    var minus = document.createElement('input');
    var plus = document.createElement('input');
    var count = document.createElement('input');
    var quantityWrap = document.createElement('div');
    var cartParent = document.createElement('div');
    quantityWrap.className = 'clearfix quantity';



    count.className = 'count';
    count.setAttribute('value', '');
    count.setAttribute('type', 'text');
    count.setAttribute('placeholder', 'Quantity');
    count.setAttribute('onkeyup', 'quantityVal(this.value)');
    
    quantityWrap.appendChild(count);
    
    cartParent.className = 'cart-parent';

    cart.className = 'cart clearfix';
    cartName.className = 'cart-name';
    cartPrice.className = 'cart-price';
    cartPrice.innerHTML =  getObj.price;
    cartName.innerHTML = getObj.name;

    cartParent.appendChild(cartName);
    cartParent.appendChild(quantityWrap);
    cartParent.appendChild(cartPrice);
    cart.appendChild(cartParent);

    for(var i = 0; i < crtParent.length; i++){
      crtParent[i].setAttribute('id', 'cart' + i); 

    }
    for(var i = 0; i < currentPrice.length; i++){ 
        currentPrice[i].setAttribute('id','price' + i);

    }
    for(var i = 0; i < quantity.length; i++){
        quantity[i].setAttribute('id', 'count' + i);
    }
    
    priceArr.push(getObj.price);
    var sum = 0;
      for (var i = 0; i < priceArr.length; i++) {
      sum += priceArr[i];
      subtotalWrap.innerHTML = 'Subtotal ' + '<span class="amount"> &#x20b9;' + sum + '</span>';

      // checkout process

      var checkout = document.getElementById('check-out');
      
      var idArr = [];
      
      checkout.style.display = 'block';
       checkout.addEventListener('click', function(){
             var myFirebase = firebase.database().ref();
             var newarry = myFirebase.child("orders");
             newarry.push({name: getObj.name});
        });    
    
    }
  });

     
  }
   
    var currentPrice = document.getElementsByClassName('cart-price');
    
    
    function quantityVal(value){
  
      for(var i = 0; i < crtParent.length; i++){
        // console.log(crtParent[i].childNodes[2].innerHTML);
         // var test = document.getElementsByClassName("count")[i].id;
         var priceId = currentPrice[i].id;
        var price =  crtParent[i].lastElementChild.innerHTML;
          var multiply = price*value;
          console.log("this"+multiply);
      }

        console.log(value);
   
}
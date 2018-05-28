// Initialize Firebase
var config = {
  apiKey: "AIzaSyBhHDLrWzsXvGAXnDb-ClLN97C_A4hNTJ4",
  authDomain: "food-menu-app-cf5f2.firebaseapp.com",
  databaseURL: "https://food-menu-app-cf5f2.firebaseio.com",
  projectId: "food-menu-app-cf5f2",
  storageBucket: "",
  messagingSenderId: "326618778484"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    if (user != null) {
  email = user.email;
  id = user.userid;
    console.log(userid);
  
}
  } else {
      var checkout = document.getElementById('check-out');
      console.log('test');
      checkout.style.display = 'none';
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
  function logout(){
    firebase.auth().signOut();
  }
//get elements
var preobject =  document.getElementById('demo');
// create refrences
var dbRefObject = firebase.database().ref('menu');
// sync object changes

var getObj = null; 
var priceArr = []; // Create price array
var nameArr = []; // Create name array
var str = ''; // Create empty string to stroe html 

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
var checkout = document.getElementById('check-out');
var jsonObj = {
    Userid: 2,
    "fooditems":[]
  };

function addToOrder(index){
  console.log('clicked');
  var dbRefObject = firebase.database().ref('menu/'+index);
    dbRefObject.on('value', snap => {
      var getObj = snap.val();

      // Get cart wrapper
      var cartMain =  document.getElementById('cart-wrap'); 
      var cart = document.getElementById('cart-box');
      cart.className = 'cart clearfix';

       // Create quantity input value
      var count = document.createElement('input'); 
      count.className = 'count';
      count.setAttribute('value', '1');
      count.setAttribute('type', 'number');
      count.setAttribute('placeholder', 'Quantity');
      count.setAttribute('onchange', 'quantityVal(this)');
      count.setAttribute('data-price', getObj.price);

      // Create quantity wrapper
      var quantityWrap = document.createElement('div'); 
      quantityWrap.className = 'quantity'; 
      quantityWrap.appendChild(count);

      // Create cart name wrapper
      var cartName = document.createElement('div'); 
      cartName.className = 'cart-name';
      cartName.innerHTML = getObj.name;

      //  Create cart price wrapper
      var cartPrice = document.createElement('div'); 
      cartPrice.className = 'cart-price';
      cartPrice.innerHTML =  getObj.price;
      
      // Create parent wrapper for each item
      var cartParent = document.createElement('div'); 
      cartParent.className = 'cart-parent';
      cartParent.appendChild(cartName);
      cartParent.appendChild(quantityWrap);
      cartParent.appendChild(cartPrice);

      // Create Sub total wrapper
      var subtotalWrap = document.getElementById('subtotal'); 

      // Append cart parent to cart wrapper
      cart.appendChild(cartParent);

      // Set attribute id for quantity 
      for(var i = 0; i < quantity.length; i++){
        quantity[i].setAttribute('id', 'count' + i);
      }
      
      // Get sub total of all the prices
      priceArr.push(getObj.price);
      var sum = 0;
        for (var i = 0; i < priceArr.length; i++) {
          sum += priceArr[i];
          subtotalWrap.innerHTML = 'Subtotal ' + '<span class="amount" id="total-amount"> &#x20b9;' + sum + '</span>';
      }

        // checkout process    
        var foodArray = {};
        foodArray.name = getObj.name;
        foodArray.quantity = count.value;
        foodArray.price = getObj.price;
        jsonObj.fooditems.push(foodArray);

        var cartTitle = document.getElementById('cart-title');
        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;
            if (user != null) {
          email = user.email;
          // id = user.userid;
               checkout.style.display = 'block';
            }
          }
            else{
          checkout.style.display = 'none';
          }
          cartTitle.style.display = 'block';
      
  });
}
  
        checkout.addEventListener('click', function(){
        var myFirebase = firebase.database().ref();
        var newarry = myFirebase.child("orders");
        console.log(jsonObj);
        newarry.push(jsonObj);
  });   
  // Calculate quantity 
    function quantityVal(e){
      if(e.value < 0 && e.value == 0){
        console.log('quantity should not be 0')
      }else{
        document.querySelector('#'+e.id).parentNode.parentNode.querySelector('.cart-price').innerHTML = e.dataset.price * e.value; 
      }

      var totalBill = 0;
      for(var i = 0; i< currentPrice.length; i++){
        var pricenew = currentPrice[i].innerHTML;

        totalBill = totalBill + parseInt(pricenew);
        document.getElementById("total-amount").innerHTML = totalBill;
      }
    }




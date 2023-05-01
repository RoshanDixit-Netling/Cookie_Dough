$(document).ready(function () {
  updateCartCount();
  $(".add-to-cart").click(function (event) {
    event.preventDefault();
    var productId = $(this).attr("data-product-id");
    var quantity = 1;
    var buynow = false;
    addToCart(productId, quantity, buynow);
  });

  $('#buy-now-button').on('click', function (event) {
    event.preventDefault();
    var productId = $(this).attr("data-product-id");
    var quantity = 1;
    var buynow = true;
    addToCart(productId, quantity, buynow);
  });
});

function buyNow(productId, quantity, buynow) {
  var data = {
    'id': productId,
    'quantity': quantity
  };
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function (data) {
      updateCartCount();
      window.location.href = '/checkout/';
    },
    error: function (XMLHttpRequest, textStatus) {
      console.log(XMLHttpRequest.responseText);
      alert('Error adding product to cart: ' + textStatus);
    }
  });
}

function addToCart(productId, quantity, buynow) {
  var data = {
    'id': productId,
    'quantity': quantity
  };
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function () {
      updateCartCount();
      if (true === buynow) {
        Window.location.href = '/checkout/';
      }
    },
    error: function (XMLHttpRequest, textStatus) {
      console.log(XMLHttpRequest.responseText);
      alert('Error adding product to cart: ' + textStatus);
    }
  });

}

function updateCartCount() {
  var cartCount = $(".cart-count");
  $.ajax({
    type: "GET",
    url: '/cart.js',
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      $(".cart-item-counter").html(response.item_count);
      // alert(response.item_count);
      cartCount.text(response.item_count);
    }
  });
}


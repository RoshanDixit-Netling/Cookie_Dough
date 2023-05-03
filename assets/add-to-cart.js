var isLoading = false;
$(document).ready(function () {
  updateCartCount(); // update cart count on load
  $(".add-to-cart").click(function (event) {
    event.preventDefault();

    $(this).html(`<div class="spinner-border text-primary" role="status"></div>`);
    $(this).addClass("currently-clicked");

    var productId = $(this).attr("data-product-id");
    var quantity = 1;
    var buynow = false;
    addToCart(productId, quantity, buynow);
  });

  $('#buy-now-button').on('click', function (event) {
    event.preventDefault();

    $(this).html(`<div class="spinner-border text-primary" role="status"></div>`);
    $(this).addClass("buy-now-clicked");

    var productId = $(this).attr("data-product-id");
    var quantity = 1;
    var buynow = true;
    addToCart(productId, quantity, buynow);
  });

  $('.qty').change(function (event) {
    /* disabled all three fields */
    $('.qty').attr('disabled', 'true');
    $('.plus').attr('disabled', 'true');
    $('.minus').attr('disabled', 'true');
    /* disabled all three fields */
    var productId = $(this).attr("data-product-id");
    var quantity = $(this).val();
    var data = { updates: {} };
    data.updates[productId] = quantity;
    updateCart(data);
  });

  $('.remove-cart').click(function (event) {
    var productId = $(this).attr("data-product-id");
    var quantity = 0;
    var data = { updates: {} };
    data.updates[productId] = quantity;
    updateCart(data);
  });

  $('.checkout-btn').click(function (event) {
    var instruction = $('.cart-instruction').val();
    $.ajax({
      type: 'POST',
      url: '/cart/update.js',
      dataType: 'json',
      data: {
        note: instruction
      },
      success: function (cart) {
        window.location.href = '/checkout/';
      },
      error: function (XMLHttpRequest, textStatus) {
        console.log("Error updating cart note: " + textStatus);
      }
    });
  });

});

/* to add product to cart */
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
        window.location.href = '/checkout/';
      } else {
        $('div#success').addClass('active');
        hidePopup();
      }
    },
    error: function (XMLHttpRequest, textStatus) {
      $('div#error').html('<p>' + JSON.parse(XMLHttpRequest.responseText).description + '</p>');
      $('div#error').addClass('active');
      hidePopup();
    }
  });
}
/* !to add product to cart */
/* to update cart also delete */
function updateCart(data) {
  $.ajax({
    type: 'POST',
    url: '/cart/update.js',
    data: data,
    dataType: 'json',
    success: function (response) {
      window.location.href = '/cart/';
    },
    error: function (XMLHttpRequest, textStatus) {
      $('.qty').attr('disabled', 'false');
      $('.plus').attr('disabled', 'false');
      $('.minus').attr('disabled', 'false');
      alert("Failed to Update Cart");
      console.log(XMLHttpRequest.responseText);
    }
  });
}
/* to update cart also delete */
/* to update the cart item count */
function updateCartCount() {
  var cartCount = $(".cart-count");
  $.ajax({
    type: "GET",
    url: '/cart.js',
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      $(".cart-item-counter").html(response.item_count);
      cartCount.text(response.item_count);
    }
  });
}
/* !to update the cart item count */
/* to auto hide successfull and error popup */
function hidePopup() {
  if ($(".popup1").hasClass("active")) {
    $('.add-to-cart').addClass('pe-none');
    setTimeout(function () {
      $(".popup1").removeClass("active");
      $('.add-to-cart').removeClass('pe-none');
      $(".currently-clicked").html("Add to cart");
      $(".buy-now-clicked").html("Buy it Now");
      $(".spinner-border").addClass("d-none");
    }, 4000);
  }
}
/* !to auto hide successfull and error popup */
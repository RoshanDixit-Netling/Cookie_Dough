$(document).ready(function () {
  updateCartCount(); // update cart count on load
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
    setTimeout(function () {
      $(".popup1").removeClass("active");
    }, 4000);
  }
}
/* !to auto hide successfull and error popup */
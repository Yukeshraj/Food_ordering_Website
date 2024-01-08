
// Firebase configuration from your Firebase console

const firebaseConfig = {
  apiKey: "AIzaSyBbPPmZZ4-QOATtIwXu7_PKyViPoO1Jm9g",
  authDomain: "taskmangagerapp.firebaseapp.com",
  databaseURL: "https://taskmangagerapp-default-rtdb.firebaseio.com",
  projectId: "taskmangagerapp",
  storageBucket: "taskmangagerapp.appspot.com",
  messagingSenderId: "381623768088",
  appId: "1:381623768088:web:3500e96020331235329f6d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Scrollspy
var spy = new Gumshoe('nav a');
// Burger
    $('.burger').on('click', function (event) {
        $('.navigation-bar').slideToggle('200');
    })

// Sticky navbar
$(document).ready(function(){
	$(window).bind('scroll', function() {
		var navHeight = $('header').height();
		if ($(window).scrollTop() > navHeight) {
			$('header').addClass('fixed');
		 }
		else {
			$('header').removeClass('fixed');
		 }
	});
});
// Scroll to TOP
var btn = $('.scrollup');
$(window).scroll(function() {
  if ($(window).scrollTop() > 500) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '500');
});
    // Reveal animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '20px',
        duration: 1500,
        reset: true
    });
    ScrollReveal().reveal('.col-left, .content-col, .img-col', { origin: 'left' });
    ScrollReveal().reveal('.col-right, .content-col-image, .getapp-content', { origin: 'right' });
    ScrollReveal().reveal('.item, .footer-about, .footer-col', { interval: 100 });
  // Function to check food availability using SweetAlert
// Function to check food availability using Firestore
function checkFoodAvailability(searchTerm) {
  db.collection("Food_Menu")
    .where("Food_Name", "==", searchTerm.toLowerCase())
    .get()
    .then(querySnapshot => {
      let foodFound = false;
      querySnapshot.forEach(doc => {
        const foodData = doc.data();
        if (foodData) {
          foodFound = true;
          Swal.fire({
            icon: 'success',
            title: `${searchTerm} is available!`,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          foodFound = true;
          Swal.fire({
            icon: 'warning',
            title: `${searchTerm} is not available.`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
      if (!foodFound) {
        Swal.fire({
          icon: 'error',
          title: `${searchTerm} is not available.`,
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
    .catch(error => {
      console.error("Error getting documents: ", error);
    });
}


// Search button click event
$('.btn').click(function() {
  const searchTerm = $('.search-food input').val();
  if (searchTerm.trim() !== '') {
    checkFoodAvailability(searchTerm);
  } else {
    Swal.fire({
      icon: 'info',
      title: "Please enter a food item to search.",
      showConfirmButton: false,
      timer: 2000
    });
  }
});
// Function to handle adding items to the cart
function addToCart(itemName, itemPrice) {
  // Perform necessary actions here, such as updating the cart or displaying a message
  console.log(`Adding ${itemName} to the cart. Price: $${itemPrice}`);

  // Display a success message using SweetAlert or other alert libraries
  Swal.fire({
    icon: 'success',
    title: `${itemName} added to cart!`,
    showConfirmButton: false,
    timer: 2000
  });

  // You can perform additional actions here, like updating the cart display or performing backend operations
}


let cartItems = []; // Array to store cart items

// Function to handle adding items to the cart
function addToCart(itemName, itemPrice) {
  // Add selected item to the cartItems array
  cartItems.push({ name: itemName, price: itemPrice });

  // Display a success message using SweetAlert
  Swal.fire({
    icon: 'success',
    title: `${itemName} added to cart!`,
    showConfirmButton: false,
    timer: 2000
  });
}

// Function to show the cart
function showCart() {
  let cartContent = '<h3>Cart</h3><ul>';
  let totalPrice = 0;


  // Display cart items in a list
  cartItems.forEach(item => {
    cartContent += `<li>${item.name} - $${item.price}</li>`
    totalPrice += item.price;
    ;
  });

  cartContent += '</ul>';

  // Display cart items using SweetAlert popup with updated options
 // Display cart items using SweetAlert popup with updated options
 Swal.fire({
  title: 'Your Cart',
  html: cartContent + `<p>Total: $${totalPrice.toFixed(2)}</p>`,
  showCloseButton: true,
  showConfirmButton: true,
  confirmButtonText: 'Proceed to Checkout',
  cancelButtonText: 'Remove Cart',
  showCancelButton: true,
  cancelButtonColor: '#d33',
  reverseButtons: true,
  preConfirm: () => {
    return true;
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.cancel) {
    // Remove all selected items when 'Continue Shopping' is clicked
    cartItems = [];
    Swal.fire({
      icon: 'success',
      title: 'Cart cleared!',
      showConfirmButton: false,
      timer: 2000
    });
  } else if (result.isConfirmed) {
    checkout(totalPrice);
  }
});
}

// Function to remove selected items from the cart
function removeSelectedItems() {
  // Implement the logic to remove selected items from the cartItems array
  // For example:
  cartItems = []; // Empty the cartItems array for demonstration purposes
  Swal.fire({
    icon: 'success',
    title: `Selected items removed from cart!`,
    showConfirmButton: false,
    timer: 2000
  });
}


// Function to handle the checkout process
// Function to handle the checkout process
// Function to handle the checkout process
function checkout(totalPrice) {
  // Ask if the user has a coupon
  Swal.fire({
    title: 'Do you have a coupon?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      // User has a coupon, ask for the coupon code
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Apply',
        showCancelButton: true,
        progressSteps: ['1']
      }).queue([
        {
          title: 'Enter a coupon code',
          input: 'text',
          inputPlaceholder: 'Coupon code'
        }
      ]).then((result) => {
        if (result.value) {
          const couponCode = result.value[0];

          // Query the Firebase database to check for the coupon code
          db.collection("Coupons")
            .where("code", "==", couponCode)
            .get()
            .then(querySnapshot => {
              if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                  const couponData = doc.data();
                  if (couponData && couponData.status === 'UNUSED') {
                    // Apply discount if coupon is valid and unused
                    const discount = 0.5; // 50% discount
                    const discountedPrice = totalPrice * (1 - discount);

                    // Update the coupon status to USED in the database
                    db.collection("Coupons").doc(doc.id).update({
                      status: 'USED'
                    });

                    Swal.fire({
                      icon: 'success',
                      title: 'Coupon applied successfully!',
                      text: `You got a 50% discount. Your new total: $${discountedPrice.toFixed(2)}`
                    }).then(() => {
                      // Proceed to payment after applying the coupon
                      proceedToPayment(discountedPrice);
                    });
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Invalid or used coupon code!',
                      text: 'Please enter a valid coupon code.'
                    });
                  }
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Invalid coupon code!',
                  text: 'Please enter a valid coupon code.'
                });
              }
            })
            .catch(error => {
              console.error("Error getting documents: ", error);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong. Please try again.'
              });
            });
        }
      });
    } else if (result.isDenied || !result.isConfirmed) {
      // No coupon or denied having one, proceed with original price
      proceedToPayment(totalPrice);
    }
  });
}


// Function to proceed to payment and collect user details
function proceedToPayment(amount) {
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: 'Enter your full name',
      inputPlaceholder: 'Full Name'
    },
    {
      title: 'Enter your email',
      inputPlaceholder: 'Email'
    },
    
  ]).then((result) => {
    if (result.value) {
      Swal.fire({
        title: 'Choose a payment method:',
        input: 'select',
        inputOptions: {
          card: 'Credit/Debit Card',
          paypal: 'PayPal',
          cash: 'Cash on Delivery'
          // Add more payment options as needed
        },
        showCancelButton: true,
        confirmButtonText: 'Pay',
        showLoaderOnConfirm: true,
        preConfirm: (paymentMethod) => {
          // Process the selected payment method here
          return new Promise((resolve) => {
            // Simulate payment processing (you can replace this with actual payment processing logic)
            setTimeout(() => {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((paymentResult) => {
        if (paymentResult.isConfirmed) {
          const userDetails = {
            fullName: result.value[0],
            email: result.value[1],
            paymentMethod: paymentResult.value
          };

          // Store user details in the Firestore database
          db.collection('UserDetails').add(userDetails)
            .then(docRef => {
              console.log('User details stored with ID: ', docRef.id,userDetails);

              Swal.fire({
                icon: 'success',
                title: 'Payment successful!',
                text: 'Your order has been placed.',
                confirmButtonText: 'OK'
              });
            })
            .catch(error => {
              console.error('Error storing user details: ', error);

              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to process payment. Please try again later.'
              });
            });
        }
      });
    }
  });
}











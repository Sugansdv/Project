
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  function validatePhone() {
    const phoneInput = document.querySelector('#phoneModal input');
    const phone = phoneInput.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/; 

    if (phoneRegex.test(phone)) {
      closeModal('phoneModal');
      showModal('couponModal');
    } else {
      alert("Please enter a valid 10-digit Indian phone number (starting with 6-9)");
      phoneInput.focus();
    }
  }

  function applyCoupon() {
    validatePhone();
  }


  window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
      event.target.style.display = 'none';
    }
  }


  window.onload = function() {
    showModal('phoneModal');
  };

  document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('#phoneModal input');
    if (phoneInput) {
      phoneInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          validatePhone();
        }
      });

      phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
      });
    }
  });
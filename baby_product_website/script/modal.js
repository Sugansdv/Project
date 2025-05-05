// Modal control functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  function validatePhone() {
    const phoneInput = document.querySelector('#phoneModal input');
    const phone = phoneInput.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers starting with 6-9

    if (phoneRegex.test(phone)) {
      closeModal('phoneModal');
      showModal('couponModal');
    } else {
      alert("Please enter a valid 10-digit Indian phone number (starting with 6-9)");
      phoneInput.focus();
    }
  }

  function applyCoupon() {
    // ✅ Call validation before showing the coupon modal
    validatePhone();
  }

  // Close modal when clicking outside content
  window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
      event.target.style.display = 'none';
    }
  }

  // Show phone modal on page load
  window.onload = function() {
    showModal('phoneModal');
  };

  // Handle Enter key and restrict to numeric input
  document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('#phoneModal input');
    if (phoneInput) {
      // Handle Enter key
      phoneInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          validatePhone();
        }
      });

      // Restrict to digits only
      phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
      });
    }
  });
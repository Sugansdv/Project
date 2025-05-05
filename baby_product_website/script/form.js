document.getElementById('subscribeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ✅ Fixed regex
    
    if (emailPattern.test(email)) {
      const modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
      modal.show();
      document.getElementById('subscribeForm').reset();
    } else {
      alert('Please enter a valid email address.');
    }
    });
document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result; 
        };
        reader.readAsDataURL(file); 
    }
  });
  
  document.getElementById('profile-pic').addEventListener('click', function() {
    document.getElementById('file-upload').click();
  });
  document.getElementById('save-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;

    localStorage.setItem('profileName', name);
    localStorage.setItem('profilePhone', phone);
    localStorage.setItem('profileDob', dob);
    localStorage.setItem('profileEmail', email);

    document.getElementById('name').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('dob').disabled = true;
    document.getElementById('email').disabled = true;

    document.getElementById('edit-btn').disabled = false;
    document.getElementById('save-btn').disabled = true;
});

document.getElementById('edit-btn').addEventListener('click', () => {
    document.getElementById('name').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('dob').disabled = false;
    document.getElementById('email').disabled = false;

    document.getElementById('save-btn').disabled = false;
    document.getElementById('edit-btn').disabled = true;
});

window.addEventListener('load', () => {
    if (localStorage.getItem('profileName')) {
        document.getElementById('name').value = localStorage.getItem('profileName');
        document.getElementById('phone').value = localStorage.getItem('profilePhone');
        document.getElementById('dob').value = localStorage.getItem('profileDob');
        document.getElementById('email').value = localStorage.getItem('profileEmail');

        document.getElementById('name').disabled = true;
        document.getElementById('phone').disabled = true;
        document.getElementById('dob').disabled = true;
        document.getElementById('email').disabled = true;

        document.getElementById('edit-btn').disabled = false;
        document.getElementById('save-btn').disabled = true;
    } else {
        document.getElementById('edit-btn').disabled = false;
        document.getElementById('save-btn').disabled = false;
    }
});

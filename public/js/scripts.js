document.addEventListener('DOMContentLoaded', (event) => {
    const body = document.getElementById('body');
    const toggle = document.getElementById('darkModeToggle');
  
    // Check local storage for dark mode setting
    if (localStorage.getItem('dark-mode') === 'enabled') {
      body.classList.add('dark-mode');
      toggle.checked = true;
    }
  
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
      }
    });
  });
  
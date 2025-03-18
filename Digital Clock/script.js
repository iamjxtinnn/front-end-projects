// Clock Functionality (unchanged)
const updateClock = () => {
  const now = new Date();
  const formatTime = (value) => String(value).padStart(2, '0');

  const hours = formatTime(now.getHours());
  const minutes = formatTime(now.getMinutes());

  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
};

// Theme Toggle Configuration
const themeConfig = {
  dark: {
    icon: 'fa-moon',
    bodyBg: '#000',
    bodyColor: '#c0c0c0',
    containerBg: '#000',
    timeBg: '#090909',
    toggleColor: '#c0c0c0', // Moon stays silver in dark mode
    shadow: false,
  },
  light: {
    icon: 'fa-sun',
    bodyBg: '#fff',
    bodyColor: '#090909', // Numbers are this color
    containerBg: '#fff',
    timeBg: '#FDFAF6',
    toggleColor: '#090909', // Sun matches numbers in light mode
    shadow: true,
  },
};

// Theme Toggle Logic
const toggler = document.querySelector('#toggle i');
const container = document.querySelector('.container');
const timeElements = document.querySelectorAll('.time');

const toggleTheme = () => {
  const isDark = toggler.classList.contains('fa-moon');
  const newTheme = isDark ? themeConfig.light : themeConfig.dark;

  // Update icon
  toggler.classList.replace(
    isDark ? 'fa-moon' : 'fa-sun',
    newTheme.icon
  );
  toggler.style.color = newTheme.toggleColor; // Update icon color

  // Update styles
  document.body.style.backgroundColor = newTheme.bodyBg;
  document.body.style.color = newTheme.bodyColor;
  container.style.backgroundColor = newTheme.containerBg;
  timeElements.forEach((el) => {
    el.style.backgroundColor = newTheme.timeBg;
    el.classList.toggle('time-shadow', newTheme.shadow);
  });
};

// Event Listener
toggler.addEventListener('click', toggleTheme);

// Initialize
setInterval(updateClock, 1000);
updateClock();
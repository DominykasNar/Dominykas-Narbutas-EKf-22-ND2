let isWeatherMode = false;
let isCalendarMode = false;
let weatherTimeout;

const weatherDisplayDuration = 5000; // Adjust the duration in milliseconds (e.g., 5000 for 5 seconds)

// Function to toggle between time, weather, and calendar
function toggleDisplay() {
    if (isCalendarMode) {
        isCalendarMode = false;
        document.getElementById('calendar').style.display = 'none';
    } else {
        isWeatherMode = !isWeatherMode;

        if (isWeatherMode) {
            showWeather();
        } else {
            revertToNormal();
        }
    }
}

// Function to show weather information
function showWeather() {
    // Placeholder data (replace with actual weather data from API)
    const weatherData = {
        temperature: "-5°C",
        humidity: "75%",
        condition: "Cloudy", // or "Cloudy", etc.
        wind: {
            speed: "8 m/s",
            direction: "S"
        }
    };

    document.getElementById('date').innerText = `Condition: ${weatherData.condition}\nHumidity: ${weatherData.humidity}`;
    document.getElementById('notifications').innerText = `Temperature: ${weatherData.temperature}\nWind: ${weatherData.wind.speed}, ${weatherData.wind.direction}`;

    // Set a timeout to revert to normal after a certain duration
    weatherTimeout = setTimeout(revertToNormal, weatherDisplayDuration);
}

// Function to show the upcoming 7-day calendar
function showCalendar() {
    isCalendarMode = true;
    document.getElementById('calendar').style.display = 'block';
    const today = new Date();
    let calendarHTML = '<h2>Upcoming 7-Day Calendar</h2><ul>';
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getDay()];
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const day = currentDate.getDate();
        calendarHTML += `<li>${dayOfWeek}, ${month} ${day}</li>`;
    }
    calendarHTML += '</ul>';
    
    document.getElementById('calendar').innerHTML = calendarHTML;
}

// Function to revert to normal time and date
function revertToNormal() {
    updateTime();
    updateDate();
    updateNotificationsCount();

    // Clear the weather timeout to prevent interference with the regular time update
    clearTimeout(weatherTimeout);

    // Update time every minute when not in weather mode
    setInterval(updateTime, 60000); // 60,000 milliseconds = 1 minute
}

// Update time every minute when not in weather mode
setInterval(updateTime, 60000); // 60,000 milliseconds = 1 minute

// Initial update
updateTime();
updateNotificationsCount();

function openSettings() {
    alert('Settings opened!');
}

function openApps() {
    alert('Apps opened!');
}

// Update time every second
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('time').innerText = timeString;
}

// Update date every second
function updateDate() {
    const now = new Date();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[now.getMonth()];
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${dayOfWeek}, ${month} ${day}, ${year}`;
    document.getElementById('date').innerText = dateString;
}

// Update notifications count
function updateNotificationsCount() {
    if (isWeatherMode) {
        document.getElementById('notifications').innerText = ''; // Clear the notifications text in weather mode
    } else {
        document.getElementById('notifications').innerText = ''; // Clear the notifications text in date mode
    }
}

// Update time every second when not in weather mode
setInterval(updateTime, 1000); // Update time every second

// Initial update
updateTime();
updateNotificationsCount(); // Initial update

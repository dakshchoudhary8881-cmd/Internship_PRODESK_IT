const API_CONFIG = {
    apiKey: "OPEN_METEO_FREE_TIER",
    geocodeUrl: "https://geocoding-api.open-meteo.com/v1/search",
    nominatimUrl: "https://nominatim.openstreetmap.org/search",
    weatherUrl: "https://api.open-meteo.com/v1/forecast",
    reverseGeocodeUrl: "https://api.bigdatacloud.net/data/reverse-geocode-client",
    cacheDuration: 10 * 60 * 1000
};
const elements = {
    searchForm: document.getElementById('search-form'),
    cityInput: document.getElementById('city-input'),
    btnGeo: document.getElementById('btn-geo'),
    errorBanner: document.getElementById('error-banner'),
    errorMessage: document.getElementById('error-message'),
    closeErrorBtn: document.getElementById('close-error'),
    loadingState: document.getElementById('loading-state'),
    weatherCard: document.getElementById('weather-card'),
    cityName: document.getElementById('city-name'),
    countryBadge: document.getElementById('country-badge'),
    cacheBadge: document.getElementById('cache-badge'),
    timestamp: document.getElementById('timestamp'),
    currentTemp: document.getElementById('current-temp'),
    weatherIcon: document.getElementById('weather-icon'),
    weatherCondition: document.getElementById('weather-condition'),
    humidityValue: document.getElementById('humidity-value'),
    windValue: document.getElementById('wind-value'),
    feelsLikeValue: document.getElementById('feels-like-value'),
    coordsValue: document.getElementById('coords-value')
};
function getWeatherDetails(wmoCode) {
    const codeMap = {
        0: { text: "Clear Sky", icon: "☀️", theme: "theme-clear" },
        1: { text: "Mainly Clear", icon: "🌤️", theme: "theme-clear" },
        2: { text: "Partly Cloudy", icon: "⛅", theme: "theme-clouds" },
        3: { text: "Overcast", icon: "☁️", theme: "theme-clouds" },
        45: { text: "Foggy", icon: "🌫️", theme: "theme-clouds" },
        48: { text: "Depositing Rime Fog", icon: "🌫️", theme: "theme-clouds" },
        51: { text: "Light Drizzle", icon: "🌦️", theme: "theme-rain" },
        53: { text: "Moderate Drizzle", icon: "🌧️", theme: "theme-rain" },
        55: { text: "Dense Drizzle", icon: "🌧️", theme: "theme-rain" },
        61: { text: "Slight Rain", icon: "🌧️", theme: "theme-rain" },
        63: { text: "Moderate Rain", icon: "☔", theme: "theme-rain" },
        65: { text: "Heavy Rain", icon: "🌊☔", theme: "theme-rain" },
        71: { text: "Slight Snowfall", icon: "❄️", theme: "theme-snow" },
        73: { text: "Moderate Snowfall", icon: "❄️", theme: "theme-snow" },
        75: { text: "Heavy Snowfall", icon: "☃️", theme: "theme-snow" },
        80: { text: "Rain Showers", icon: "🌦️", theme: "theme-rain" },
        81: { text: "Heavy Rain Showers", icon: "⛈️", theme: "theme-rain" },
        82: { text: "Violent Rain Showers", icon: "⛈️", theme: "theme-rain" },
        95: { text: "Thunderstorm", icon: "⚡⛈️", theme: "theme-rain" }
    };
    return codeMap[wmoCode] || { text: "Atmospheric Activity", icon: "🌡️", theme: "theme-default" };
}
function showLoading() {
    elements.loadingState.classList.remove('hidden');
    elements.weatherCard.style.opacity = '0.5';
    hideError();
}
function hideLoading() {
    elements.loadingState.classList.add('hidden');
    elements.weatherCard.style.opacity = '1';
}
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorBanner.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
}
function hideError() {
    elements.errorBanner.classList.add('hidden');
}
function applyTheme(themeClass) {
    document.body.className = themeClass;
}
function getCachedData(cityKey) {
    try {
        const cached = localStorage.getItem(`weather_cache_${cityKey}`);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        const now = Date.now();
        if (now - parsed.timestamp < API_CONFIG.cacheDuration) {
            return parsed.data;
        } else {
            localStorage.removeItem(`weather_cache_${cityKey}`);
            return null;
        }
    } catch (err) {
        return null;
    }
}
function setCachedData(cityKey, data) {
    try {
        const payload = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(`weather_cache_${cityKey}`, JSON.stringify(payload));
    } catch (err) {}
}
function renderWeather(data, isCached = false) {
    elements.cityName.textContent = data.cityName;
    elements.countryBadge.textContent = data.country || "GLOBAL";
    elements.currentTemp.textContent = Math.round(data.temp);
    elements.weatherIcon.textContent = data.icon;
    elements.weatherCondition.textContent = data.condition;
    elements.humidityValue.textContent = `${data.humidity}%`;
    elements.windValue.textContent = `${data.wind} km/h`;
    elements.feelsLikeValue.textContent = `${Math.round(data.feelsLike)}°C`;
    elements.coordsValue.textContent = `${data.lat.toFixed(2)}, ${data.lon.toFixed(2)}`;
    if (isCached) {
        elements.cacheBadge.className = "cache-badge cached";
        elements.cacheBadge.innerHTML = `<i data-lucide="package"></i> Cached (10m)`;
    } else {
        elements.cacheBadge.className = "cache-badge live";
        elements.cacheBadge.innerHTML = `<i data-lucide="radio"></i> Live API`;
    }
    const now = new Date();
    elements.timestamp.textContent = `Updated: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    applyTheme(data.theme);
    if (window.lucide) window.lucide.createIcons();
}
let _autocompleteTimer = null;
let _suggestionsList = null;
function ensureSuggestionsContainer() {
    if (_suggestionsList) return _suggestionsList;
    _suggestionsList = document.createElement('ul');
    _suggestionsList.id = 'city-suggestions';
    _suggestionsList.className = 'city-suggestions';
    const searchContainer = elements.searchForm.parentElement;
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(_suggestionsList);
    return _suggestionsList;
}
function hideSuggestions() {
    if (_suggestionsList) {
        _suggestionsList.innerHTML = '';
        _suggestionsList.classList.remove('visible');
    }
}
function getFlagEmoji(countryCode) {
    const cc = countryCode.toUpperCase();
    return [...cc].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('');
}
function extractCityName(result) {
    if (result.address) {
        return result.address.city || result.address.town || result.address.village
            || result.address.hamlet || result.address.suburb || result.name || 'Unknown';
    }
    return result.name || result.display_name.split(',')[0] || 'Unknown';
}
async function fetchSuggestions(query) {
    if (query.length < 2) { hideSuggestions(); return; }
    try {
        const url = `${API_CONFIG.nominatimUrl}?q=${encodeURIComponent(query)}&format=json&limit=8&addressdetails=1&accept-language=en`;
        const res = await fetch(url, { headers: { 'User-Agent': 'WeatherCastApp/1.0' } });
        if (!res.ok) return;
        const data = await res.json();
        if (!data || data.length === 0) { hideSuggestions(); return; }
        const list = ensureSuggestionsContainer();
        list.innerHTML = '';
        const seen = new Set();
        data.forEach(r => {
            const label = r.display_name;
            if (seen.has(label)) return;
            seen.add(label);
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            const cc = r.address?.country_code || '';
            const countryFlag = cc ? getFlagEmoji(cc) : '🌍';
            li.innerHTML = `<span class="suggestion-flag">${countryFlag}</span>
                <span class="suggestion-text">${label}</span>
                <span class="suggestion-country-code">${cc.toUpperCase()}</span>`;
            li.addEventListener('click', () => {
                const cityName = extractCityName(r);
                elements.cityInput.value = cityName;
                hideSuggestions();
                const lat = parseFloat(r.lat);
                const lon = parseFloat(r.lon);
                const cacheKey = `${cityName}_${lat}_${lon}`.toLowerCase();
                fetchWeatherByCoords(lat, lon, cityName, cc, cacheKey);
            });
            list.appendChild(li);
        });
        list.classList.add('visible');
    } catch (_) {}
}
async function fetchWeatherByCity(cityName) {
    const normalizedKey = cityName.trim().toLowerCase();
    const cachedData = getCachedData(normalizedKey);
    if (cachedData) {
        renderWeather(cachedData, true);
        return;
    }
    showLoading();
    hideSuggestions();
    try {
        const nominatimUrl = `${API_CONFIG.nominatimUrl}?q=${encodeURIComponent(cityName)}&format=json&limit=5&addressdetails=1&accept-language=en`;
        const nominatimRes = await fetch(nominatimUrl, { headers: { 'User-Agent': 'WeatherCastApp/1.0' } });
        if (nominatimRes.ok) {
            const nominatimData = await nominatimRes.json();
            if (nominatimData && nominatimData.length > 0) {
                const best = nominatimData[0];
                const city = extractCityName(best);
                const cc = best.address?.country_code || '--';
                const lat = parseFloat(best.lat);
                const lon = parseFloat(best.lon);
                const cacheKey = `${city}_${lat}_${lon}`.toLowerCase();
                await fetchWeatherByCoords(lat, lon, city, cc, cacheKey);
                return;
            }
        }
        const geocodeResponse = await fetch(`${API_CONFIG.geocodeUrl}?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`);
        if (!geocodeResponse.ok) {
            throw new Error(`Geocoding server error: ${geocodeResponse.status}`);
        }
        const geocodeData = await geocodeResponse.json();
        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error(`"${cityName}" not found. Check spelling or try a nearby larger city.`);
        }
        const location = geocodeData.results[0];
        const cacheKey = `${location.name}_${location.latitude}_${location.longitude}`.toLowerCase();
        await fetchWeatherByCoords(location.latitude, location.longitude, location.name, location.country_code, cacheKey);
    } catch (error) {
        showError(error.message || "Failed to retrieve atmospheric data. Check connection.");
    } finally {
        hideLoading();
    }
}
async function fetchWeatherByCoords(lat, lon, cityName = "Location", countryCode = "--", cacheKey = null) {
    showLoading();
    try {
        const weatherUrl = `${API_CONFIG.weatherUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const weatherData = await response.json();
        const current = weatherData.current;
        const details = getWeatherDetails(current.weather_code);
        const structuredPayload = {
            cityName: cityName,
            country: countryCode ? countryCode.toUpperCase() : "GPS",
            temp: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            wind: current.wind_speed_10m,
            condition: details.text,
            icon: details.icon,
            theme: details.theme,
            lat: lat,
            lon: lon
        };
        renderWeather(structuredPayload, false);
        if (cacheKey) {
            setCachedData(cacheKey, structuredPayload);
        }
    } catch (error) {
        showError("Unable to load weather forecast for coordinates.");
    } finally {
        hideLoading();
    }
}
async function reverseGeocodeAndFetch(lat, lon) {
    showLoading();
    try {
        const response = await fetch(`${API_CONFIG.reverseGeocodeUrl}?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        const city = data.city || data.locality || data.principalSubdivision || "Local Area";
        const country = data.countryCode || "GPS";
        await fetchWeatherByCoords(lat, lon, city, country, city.toLowerCase());
    } catch (error) {
        await fetchWeatherByCoords(lat, lon, "My Location", "GPS");
    }
}
function initGeolocation() {
    if (!navigator.geolocation) {
        fetchWeatherByCity("London");
        return;
    }
    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            reverseGeocodeAndFetch(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            fetchWeatherByCity("London");
        },
        { timeout: 8000 }
    );
}
function setupEventListeners() {
    elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cityQuery = elements.cityInput.value.trim();
        if (cityQuery) {
            fetchWeatherByCity(cityQuery);
            elements.cityInput.blur();
        }
    });
    elements.cityInput.addEventListener('input', () => {
        clearTimeout(_autocompleteTimer);
        const q = elements.cityInput.value.trim();
        if (q.length < 2) { hideSuggestions(); return; }
        _autocompleteTimer = setTimeout(() => fetchSuggestions(q), 300);
    });
    elements.cityInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideSuggestions();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) hideSuggestions();
    });
    elements.btnGeo.addEventListener('click', () => {
        initGeolocation();
    });
    elements.closeErrorBtn.addEventListener('click', hideError);
}
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    setupEventListeners();
    initGeolocation();
});
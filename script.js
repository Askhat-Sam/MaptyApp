'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) 
    navigator.geolocation.getCurrentPosition(
        function(position){
            const {latitude, longitude}=position.coords;
        
            const coords=[latitude, longitude]

            map = L.map('map').setView(coords, 13);
            console.log(map);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: 
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('click', function(mapE){
                mapEvent=mapE
                form.classList.remove('hidden');
                inputDistance.focus();
                console.log(map);
        })
    }, 
    function(){
        alert('Could not get your position')
    });

console.log(map);
form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(mapEvent);
    console.log(map);


    const {lat, lng} = mapEvent.latlng
    // console.log(lat, lng);
    L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
        L.popup({
        maxWidth: 250,
        minWidth: 100,
        // autoClose: false,
        closeOnClick: false,
        className: 'running-popup',         
    })
    )
    .setPopupContent('Here')
    .openPopup();
    
});




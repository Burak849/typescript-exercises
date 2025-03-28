import axios from 'axios';

//! GOOGLE MAPS PROJECT

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // never will be null
const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";  // invalid api key

declare var google: any;

type GoogleGeocodingResponse = { 
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS'; // those are from google geocoding form
};

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to google's api
    // go "google geocoding api" get an API KEY take use the key
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response => {
        if ( response.data.status !== 'OK'){
            throw new Error("couldnt fetch location");
        }
        const coordinates = response.data.results[0].geometry.location; // successul fetch
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 16
          }); // this is how to create a google map and you can get the codes from google geocoding js form

          new google.maps.Marker({position: coordinates, map: map });
    })
    .catch(err => {
        alert(err.message);
        console.log(err);

    } );
// this is how you find the place
}

form.addEventListener('submit', searchAddressHandler );



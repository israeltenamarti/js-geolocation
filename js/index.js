let apikey = "fe5c6786e50e41afa04073128ccfcfb6";

const button = document.querySelector("button");

button.addEventListener("click", ()=>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        button.innerText = "Geolocation not supported.";
    }
});

function onSuccess (position){
    console.log(position);
    //Usamos la API de https://opencagedata.com validado con la cuenta de Google
    button.innerText = "Searching...";
    let {latitude, longitude} = position.coords;  //Obtenemos las coordenadas
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
    .then(response => response.json())
    .then(result => {
        let allDetails = result.results[0].components;
        let {county, postcode, country} = allDetails;   //Obtenemos la Provincia, Codigo Postal y Pais
        button.innerText = `${county} ${postcode}, ${country}`;
    }).catch(()=>{
        button.innerText = "An error has occurred.";
    });
}

function onError (error){
    if (error.code == 1){
        button.innerText = "Permission Denied.";
    }
    else if (error.code == 2){
        button.innerText = "Geolocation not available.";
    }else{
        button.innerText = "An error has occurred.";
    }
    button.setAttribute("disable","true");
}


const author = document.getElementById('author');
const place = document.getElementById('location');
const crypto = document.getElementById('crypto');
const stats = document.getElementById('stats');
const weather = document.getElementById('weather');

const defaultBackground = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&dark&wild`;
const defaulAuthor = 'Fabian Quintero';


// let imagequery , nestedimagequery;





//Getting Weather of the user from Geological Coordinates.

if (navigator.geolocation) (
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if(!res.ok) throw Error('Weather Data not available');
            return res.json();
        })
        .then(data => {
            // http://openweathermap.org/img/wn/04n@2x.png
            weather.textContent =  data.weather[0].description.toUpperCase();
            imagequery = data.weather[0].main.toLowerCase();
            nestedimagequery = data.weather[0].description.toLowerCase();
            let src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById('icon').innerHTML = `
                <img src ='${src}' </img>    
            `
            document.getElementById('weather').innerHTML = `
                <h1>${Math.round(data.main.temp)}°C</h1>
                <p>${data.name}</p>
            `
           
        })
        .catch(err => console.log(err))
    })
)


//Getting the Image from UNSPLASH API

fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&water&mountains&desert}`)
.then(res => res.json())
.then(data => {
    // console.log(data)
    author.textContent = `By : ${data.user.name}`;
    document.body.style.backgroundImage = `url(${data.urls.full})`
    place.textContent = data.location.title;
})
.catch(err => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1552083375-1447ce886485?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mjg3Nzg3MTY&ixlib=rb-1.2.1&q=85)`;
    author.textContent = defaulAuthor;
})

//Fetching Real Time data of Coins

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
.then(res => {
    if(!res.ok) throw Error('Something went wrong');
    return res.json()
})
.then(data => {
  
    crypto.innerHTML = `
        <img src = '${data.image.small}' />
        <span>${data.name}</span>
    `
    stats.innerHTML = `
       <p>🎯 : ₹${data.market_data.current_price.inr} </p>
       <p>☝️ : ₹${data.market_data.high_24h.inr}</p>
       <p>👇 : ₹${data.market_data.low_24h.inr}</p>
    `

})
.catch(err => console.log(err))

 //Displaying Real Time
setInterval(() => {  
    let d = new Date;
    let hour = (d.getHours()<10?'0':'') + d.getHours();
    let min = (d.getMinutes()<10?'0':'') + d.getMinutes();
    document.getElementById('time').innerHTML = `
        <h1 class=time> ${hour} : ${min}</h1>
    `;    
}, 1000);


//Fetching a Random Quote

fetch("https://type.fit/api/quotes")
  .then(res => res.json()) 
  .then(data => {
      const len = data.length;
      const ind = Math.round((Math.random()+1)*len)%len;
      console.log(data[ind])
      document.getElementById('quote').innerHTML += `
        <p> ${data[ind].text} </p>
    `;
})


async function getWeather(withIp = true) {
    let location
    if (!withIp) {
        location = document.getElementById('ville').value;
       
        if (!location) {
            alert('Please enter a city name');
            return;
        }
    } else {
         const ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(json => json.ip);
    
     location = await fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(json => json.city);

    }
   
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b01280995a34085846521118a869e702&units=metric&lang=fr`)
        .then(response => response.json())
        .then(json => {
            const temperature = json.main.temp;
            const description = json.weather[0].description;
            const condition = json.weather[0].main;
            const name = json.name;
            const humidity = json.main.humidity;
            const speed = json.wind.speed;
            console.log(json);
            
            
            

            document.getElementById('temp').textContent = Math.round(temperature) + '°C' ;
            document.getElementById('commentaire').textContent = description.charAt(0).toUpperCase() + description.slice(1);
            document.getElementById('name').textContent = name;
            document.getElementById('humidite').textContent = 'Humidité : ' + humidity + '%';
            document.getElementById('speed').textContent = 'Vent : ' + speed +' km/h';
            document.body.className = condition.toLowerCase();

            if (condition === 'Clear') {                                                                                                        
                document.querySelector('h2 img').src = 'assets/clear.png';
            }
            else if (condition === 'Clouds') {
                document.querySelector('h2 img').src = 'assets/clouds.png';
            }
            else if (condition === 'Rain') {
                document.querySelector('h2 img').src = 'assets/rain.png';
            }
            else if (condition === 'Drizzle') {
                document.querySelector('h2 img').src = 'assets/drizzle.png';
            }
            else if (condition === 'Thunderstorm') {
                document.querySelector('h2 img').src = 'assets/thunder.png';
            }
            else if (condition === 'Snow') {
                document.querySelector('h2 img').src = 'assets/snow.png';
            }
            
        });

        let ville = document.getElementById('ville');
        ville.addEventListener('keydown',function(e){
            if(e.key === 'Enter'){
                getWeather(false);
            }
        })

        
}   

getWeather();

const date = new Date()
const weekday = date.toLocaleDateString('en-fr',{weekday:"long"})
const day = date.toLocaleDateString('en-fr',{day:"numeric"})
const month = date.toLocaleDateString('en-fr',{month:"long"})

document.getElementById('weekday').textContent = weekday
document.getElementById('day').textContent = day
document.getElementById('month').textContent = month

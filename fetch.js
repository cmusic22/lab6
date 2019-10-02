let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let setCordinates = [0, 0]
let zoomLevel = 1 //map initial zoom level
let map = L.map("iss-map").setView(setCordinates, zoomLevel)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoiY211c2ljMjIiLCJhIjoiY2sweThnYWJhMGRkMzNjbWlnamt1OWZ2bSJ9.vRXisZtBmgcftSToYLKudg'
}).addTo(map)

let icon = L.icon ({
	iconUrl: 'iss.png',
	iconSize: [50,50],
	iconAnchor: [25,25]
})

let marker
setInterval(issLocation, 10000)

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')

function issLocation (){
	fetch(url)
	.then( res => res.json() )
	.then( issData => {
		console.log(issData)
		let lat = issData.latitude
		let long = issData.longitude

		issLat.innerHTML = lat
		issLong.innerHTML = long


		let iisCordinates = [lat, long]
		if(!marker){
			marker = L.marker(iisCordinates, {icon: icon}).addTo(map)
		}else{		
			marker.setLatLng(iisCordinates)
		}
	})

.catch( err => {
	console.log(err)
})}


//promise Syntax
/*fetch(url)
	.then( (response) => {
		console.log(response)
		return response.json()
	}).then( (data) => {
		console.log(data)
	}).catch( (effor) = {
		console.log('error!', error)
	})*/


const map = L.map('map');
map.setView([1.3521,103.8198],13); 

function addMarkerToLayer(data,layer){

    for(result of data){

        const marker =L.marker(result.coordinates).addTo(layer);
        marker.bindPopup(`<h1>${result.name}</h1>`);
    }


}





document.addEventListener("DOMContentLoaded", async function(){



    // adding tiles layer on top of 'map' variable
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const hdbRequest = axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/hdb.json");
    const mallsRequest = axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/malls.json");
    const natureRequest = axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/nature.json");

    const hdbResponse = await hdbRequest;
    const mallsResponse = await mallsRequest;
    const natureResponse = await natureRequest;

    const hdbLayer = L.layerGroup();
    hdbLayer.addTo(map);
    const mallsLayer = L.layerGroup();
    mallsLayer.addTo(map);
    const natureLayer = L.layerGroup();
    natureLayer.addTo(map);
    
    addMarkerToLayer(hdbResponse.data,hdbLayer);
    addMarkerToLayer(mallsResponse.data,mallsLayer);
    addMarkerToLayer(natureResponse.data,natureLayer);

    const baseLayers = {
        "HDB":  hdbLayer,
        "MALLS":    mallsLayer,
        "NATURE":   natureLayer,
    }

    L.control.layers(baseLayers,{}).addTo(map);

    

})

// below line for view all button 
const viewAllbutton = document.getElementById('view-all-btn');
// below line for no image found message
const noImageMsg = `./images/no-image.png`;
/* 
---------------------main section start ----------------------------------------
*/
// this function for get the data from API 
function displayPlayer(name, showAllValues){
    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${name}`)
    .then(res => res.json())
    .then(data => setPlayerData(data.player, showAllValues))
};
// this function for manage the data which gets from the API
function setPlayerData(players, showAllValues){
    const playerDetailsContainer = document.getElementById('player-details-container');
    playerDetailsContainer.textContent = '';
    // this condition section works for data slicing and set class for view all button
    if(players.length > 9 && showAllValues){ 
        players = players;
        viewAllbutton.classList.add('hidden');
    }else{
        players = players.slice(0,6);
        if(players.length < 6){
            viewAllbutton.classList.add('hidden');
        }else{
            viewAllbutton.classList.remove('hidden');
        };
    };

    const playerInfoContainer = document.getElementById('player-info-container');
    playerInfoContainer.innerHTML = '';
    
    for(let player of players){
        const creatPlayerInfoDiv = document.createElement('div');
        // if(player.strThumb == null){
        //     continue;
        // }else{
            creatPlayerInfoDiv.innerHTML = `
            <div class="bg-white max-w-sm rounded overflow-hidden shadow-lg m-2">
                <img class="w-full" src="${player.strThumb ? player.strThumb : noImageMsg}" alt="...">
                <div class="p-1">
                    <h5><span class="font-semibold">Name:</span> ${player.strPlayer}</h5>
                    <p><span class="font-semibold">Sports:</span> ${player.strSport}</p>
                    <p><span class="font-semibold">Coundry:</span> ${player.strNationality}</p>
                    <button class="bg-blue-400 py-2 mt-2 text-white font-bold w-full" onclick="displayPlayerDetails('${player.idPlayer}')">Details</button>
                </div>
            </div>        
            `;
        // }
        playerInfoContainer.appendChild(creatPlayerInfoDiv);  
    };
    // loading end 
    const loadingDisplay = document.getElementById('loading-display');
    loadingDisplay.classList.add('hidden');
};
   
displayPlayer(''); /* this function called for auto load some data after getting start */ 

// this function for get the data from input field 
function searchPlayer(showAllValues){
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    inputField.value = '';
    displayPlayer(inputFieldValue, showAllValues);
    // loading spin strart 
    const loadingDisplay = document.getElementById('loading-display');
    loadingDisplay.classList.remove('hidden');
};

/* 
---------------------details section start ----------------------------------------
*/
// this function for get the details data from the API
function displayPlayerDetails(details){
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`)
    .then(res => res.json())
    .then(data => setPlayerDetails(data.players[0]))
};
// this function for view details working section 
function setPlayerDetails(players){
    viewAllbutton.classList.add('hidden');

    const playerInfoContainer = document.getElementById('player-info-container');
    playerInfoContainer.textContent = '';

    const playerDetailsContainer = document.getElementById('player-details-container');
    const creatPlayerDetailsDiv = document.createElement('div');
        creatPlayerDetailsDiv.innerHTML = `
        <div class="grid grid-cols-1 justify-items-center w-3/4 mx-auto border ">
            <img class="w-fit h-60" src="${players.strThumb ? players.strThumb : noImageMsg}" class=" " alt="...">
            <div class="">
                <div class="flex justify-between my-2">
                    <div>
                        <h5><span class="font-semibold">Name:</span> ${players.strPlayer}</h5>
                        <p><span class="font-semibold">Sports:</span> ${players.strSport}</p>
                        <p><span class="font-semibold">Country:</span> ${players.strNationality}</p>
                    </div>
                    <div>
                        <p><span class="font-semibold">Date of birth:</span> ${players.dateBorn}</p>
                        <p><span class="font-semibold">Birth place:</span> ${players.strBirthLocation}</p>
                        <p><span class="font-semibold">Gender:</span> ${players.strGender}</p>
                    </div>
                    <div>
                        <p><span class="font-semibold">Hight:</span> ${players.strHeight}</p>
                        <p><span class="font-semibold">Weight:</span> ${players.strWeight}</p>
                    </div>
                </div>
                <p><span class="font-semibold">Description:</span> ${players.strDescriptionEN ? players.strDescriptionEN : 'No description found'}</p>
            </div>
        </div>        
        `;
    playerDetailsContainer.appendChild(creatPlayerDetailsDiv);
};
// this event handler work for view all button 
viewAllbutton.addEventListener('click', function(){
        searchPlayer(10);
});


// below line for view all button 
const viewAllbutton = document.getElementById('view-all-btn');
// below line for no image found message
const noImageMsg = `./images/no-image.png`;
// below line for getting loading spin section
const loadingDisplay = document.getElementById('loading-display');
// below line for getting no result found section
const noResultFoundSection = document.getElementById('no-result-found');
/* 
---------------------main section start ----------------------------------------
*/
// this function for get the data from API 
function displayPlayer(name, dataLimit){
    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${name}`)
    .then(res => res.json())
    .then(data => setPlayerData(data.player, dataLimit))
};
// this function for manage the data which gets from the API
function setPlayerData(players, dataLimit){
    console.log(players.length)
    const playerDetailsContainer = document.getElementById('player-details-container');
    playerDetailsContainer.textContent = '';

    const playerInfoContainer = document.getElementById('player-info-container');
    playerInfoContainer.innerHTML = '';

    if(!players){
        playerInfoContainer.innerHTML = '';
        viewAllbutton.classList.add('hidden');
        loadingDisplay.classList.add('hidden');
        return noResultFoundSection.classList.remove('hidden');
    }else{
        noResultFoundSection.classList.add('hidden');
    };
    // this condition section works for data slicing and set class for view all button
    if(players.length > 9 && dataLimit){ 
        viewAllbutton.classList.add('hidden');
    }else{
        players = players.slice(0,6);
        if(players.length < 6){
            viewAllbutton.classList.add('hidden');
        }else{
            viewAllbutton.classList.remove('hidden');
        };
    };

    for(let player of players){
        // destructuring 'player' object
        const {strThumb, strPlayer, strSport, strNationality} = player;

        const creatPlayerInfoDiv = document.createElement('div');
            creatPlayerInfoDiv.innerHTML = `
            <div class="bg-white max-w-sm rounded overflow-hidden shadow-lg m-2">
                <img class="w-full" src="${strThumb ? strThumb : noImageMsg}" alt="...">
                <div class="p-1">
                    <h5><span class="font-semibold">Name:</span> ${strPlayer ? strPlayer : 'No name found'}</h5>
                    <p><span class="font-semibold">Sports:</span> ${strSport ? strSport : 'No sports found'}</p>
                    <p><span class="font-semibold">Coundry:</span> ${strNationality ? strNationality : 'No nationality found'}</p>
                    <button class="bg-blue-400 py-2 mt-2 text-white font-bold w-full" onclick="displayPlayerDetails('${player.idPlayer}')">Details</button>
                </div>
            </div>        
            `;
        playerInfoContainer.appendChild(creatPlayerInfoDiv);  
    };
    // loading end 
    loadingDisplay.classList.add('hidden');  
};
   
displayPlayer(''); /* this function called for auto load some data after getting start */ 

// this function for get the data from input field 
function searchPlayer(){
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    inputField.value = '';
    if(inputFieldValue === '' || !isNaN(inputFieldValue)){
        return alert('Please enter players name');
    }else{
        displayPlayer(inputFieldValue);
    };
    // loading spin strart 
    loadingDisplay.classList.remove('hidden');
};

document.getElementById('input-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchPlayer();
    }
});

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
    // destructuring 'players' object 
    const {strThumb, strPlayer, strSport, strNationality, dateBorn, strBirthLocation, strGender, strHeight, strWeight, strDescriptionEN} = players;

    const playerInfoContainer = document.getElementById('player-info-container');
    playerInfoContainer.textContent = '';

    const playerDetailsContainer = document.getElementById('player-details-container');
    const creatPlayerDetailsDiv = document.createElement('div');
        creatPlayerDetailsDiv.innerHTML = `
        <div class="grid grid-cols-1 justify-items-center w-3/4 mx-auto border ">
            <img class="w-fit h-60" src="${strThumb ? strThumb : noImageMsg}" class=" " alt="...">
            <div class="">
                <div class="flex justify-between my-2">
                    <div>
                        <h5><span class="font-semibold">Name:</span> ${strPlayer ? strPlayer : 'No name found'}</h5>
                        <p><span class="font-semibold">Sports:</span> ${strSport ? strSport : 'No sports found'}</p>
                        <p><span class="font-semibold">Country:</span> ${strNationality ? strNationality : 'No nationality found'}</p>
                    </div>
                    <div>
                        <p><span class="font-semibold ml-2">Date of birth:</span> ${dateBorn ? dateBorn : 'No Date of birth found'}</p>
                        <p><span class="font-semibold ml-2">Birth place:</span> ${strBirthLocation ? strBirthLocation : 'No birth place found'}</p>
                        <p><span class="font-semibold ml-2">Gender:</span> ${strGender ? strGender : 'No gender found'}</p>
                    </div>
                    <div>
                        <p><span class="font-semibold ml-2">Hight:</span> ${strHeight ? strHeight : 'No hight found'}</p>
                        <p><span class="font-semibold ml-2">Weight:</span> ${strWeight ? strWeight : 'No weight found'}</p>
                    </div>
                </div>
                <p><span class="font-semibold">Description:</span> ${strDescriptionEN ? strDescriptionEN : 'No description found'}</p>
            </div>
        </div>        
        `;
    playerDetailsContainer.appendChild(creatPlayerDetailsDiv);
};
// this event handler work for view all button 
viewAllbutton.addEventListener('click', function(){
        displayPlayer('','dataLimit')
});


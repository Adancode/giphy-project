var buttonsHTML = '';
var countryArray = ['Japan', 'China', 'Mongolia', 'North Korea', 'Vietnam', 'Thailand', 'Australia', 'India', 'Pakistan', 'Iran', 'Russia', 'Iraq', 'Saudi Arabia', 'Turkey', 'Greece', 'Italy', 'Spain', 'Egypt', 'Germany', 'France', 'England', 'Ireland'];
var newCountryValue;
var giphyKey = "dc6zaTOxFJmzC";
var searchCountry;
var giphyHolder;
var giphyArray = [];

function generateButtons() {
     for (var i = 0; i < countryArray.length; i++) {
          buttonsHTML += "<button class='btn btn-lrg btn-primary country-buttons' data-country=" + countryArray[i] + ">" + countryArray[i] + "</button>";
     }
     $('#country-buttons-container').html(buttonsHTML);
}

$(document).ready(function() {

generateButtons();

$('body').on('click', '#add-country', function(event){
     event.preventDefault();
     newCountryValue = $('#country-input').val();
     newButton = "<button class='btn btn-lrg btn-primary country-buttons' data-country=" + newCountryValue + ">" + newCountryValue + "</button>";
     $('#country-buttons-container').append(newButton);
});

$('body').on('click', '.country-buttons', function(event){
     $('.giphy-div').empty();
     searchCountry = $(this).attr('data-country');
     queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchCountry + "&limit=10" +"&api_key=dc6zaTOxFJmzC";
     console.log(queryURL);
     $.ajax({url: queryURL, method: 'GET'})
          .done(function(response) {
               console.log(response.data);
               for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    $('.giphy-div').append("<div class='outer-container'><p class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    giphyArray.push(response.data[i].images.downsized.url);
               }
          });

}); // Closes country-buttons onclick event

$('body').on('click', '.images-returned', function(event){
     var state = $(this).attr('data-state');
     var thisImgDataStill = $(this).attr('data-still');
     var thisImgDataAnimate = $(this).attr('data-animate');
     if (state === 'still') {
          $(this).attr('src', thisImgDataAnimate);
          $(this).attr('data-state', 'animate');
     }
     if (state !== "still") {
          $(this).attr('src', thisImgDataStill);
          $(this).attr('data-state', 'still');
     }
});  // Closes animal images onclick event

}); // Closes jQuery .ready function

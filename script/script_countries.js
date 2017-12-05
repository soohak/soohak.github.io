/*
 Course: PROG1700 (Section: 706)
 Author: Soohak KIM (w0409248)
 Final Project: Javascipt Client Side programming
 Title: Countries of The World
 Date: 2017-12-xx
 Filename: script_countries.js (script for countries_world.html)
*/

"use strict";

// var request = new XMLHttpRequest();
// request.open("get", "script/countries.json", true);
var array = [];
var country_name = "";
var area = 0.0;
var population = 0;
var world_population = 0.0;
var rate_per_worl = 0.0;
var Population_Density = 0.0;


// *** Function Part ***
// Function1: Open the JSON file and load data when this page open
function OpenJason() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            array = JSON.parse(this.responseText);
            GetSelectValue();
        }
    }
    request.open("GET", "../script/countries.json", true);
    request.send();
}

// Function2: Display country list in select drop down box
function GetSelectValue()
{
    var option_value = "<option>Select Country</option>";

    for (var i = 0; i < array.length; i++) {
        option_value += `<option value=${i}>${array[i].Name}</option>`;
    }
    document.getElementById('country_select').innerHTML = option_value;
}

// Function3: Change the number with comma in Population textarea
function Display_num(displaynumber)
{
    //JavaScript Regular Expression: I refer from the Internet
    return displaynumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Function4: Change Flag image from 'flag' file folder
function ChangeFlag(country)
{
    var change_value = "";
    var flag_name = "";
    var under_bar = "_";

    // Change country name to file_name with "_"
    for(var u=0; u<country.length; u++)
    {
        if(country[u] ==" ")
        {
            flag_name += `${under_bar}`;
        }
        else
        {
            flag_name += `${country[u]}`;
        }
    }

    change_value +=`<h3>${country}</h3>\n`;
    change_value +=`<img src="../flags/${flag_name}.png" alt=\"Countries of The World\" />\n`;
    document.getElementById('flag').innerHTML = change_value;
}

// Function5: Display country information in each element (main function)
function DisplayCountryData()
{
    //Reset variable data for user select other country again after first choice
    area = 0.0;
    population = 0;
    world_population = 0.0;
    rate_per_worl = 0.0;
    Population_Density = 0.0;

    //Get index number from selected country name
    // This index number is same the oder number of array
    var first_select = document.getElementById("country_select");
    var selected_index = first_select.options[first_select.selectedIndex].value;

    //Input the value to variables from 'array = JSON.parse(this.responseText);' with matched data by index number of select
    country_name = array[selected_index].Name;
    population = parseFloat(array[selected_index].Population);
    area = parseFloat(array[selected_index].Area);
    var numeric = Display_num(population); // change number with "," per three digit

    // Sum of the population all countries
    for (var i = 0; i < array.length; i++) {
        world_population += parseInt(array[i].Population);
    }
    // Calculate Population Density
    Population_Density = population/area;

    // Calculate Percentage of World Population:
    rate_per_worl = (population/world_population)*100;

    //document.getElementById('pop_country').value = population;
    document.getElementById('pop_country').value = numeric;
    document.getElementById('Mile_Kilo').value = area.toFixed(1);
    document.getElementById('pop_density').value = Population_Density.toFixed(2);
    document.getElementById('world_pop').value = `${rate_per_worl.toFixed(3)}`+`%`;
    ChangeFlag(country_name);

    //Default set is Miles
    document.getElementById("area_block").value = 1;

    //Default set is per square mile
    document.getElementById('mile').checked = true;
    document.getElementById('kilo').checked = false;

    //button able
    document.getElementById('wiki').disabled = false;
}

// Function6: Display Area in Sq.Miles or Sq.kilometres by the second select element
function CalculateKilloMile() {
    var sq_miles = 0.0;
    var sp_kilometres = 0.0;

    //Get index number from current sq.Miles data in select box
    // This index number is same the oder number of array
    var second_select = document.getElementById("area_block");
    var selected_index = second_select.options[second_select.selectedIndex].value;

    // Calculate for change to sq.KM
    // 1 mile = 1.609347 km. Therefore, 1 Sq.Miles = 1.609347*1.609347 = 2.589997766409, around 2.6 Sq.kilometres
    sq_miles = area.toFixed(1);
    sp_kilometres = sq_miles * 2.6;

    if(selected_index == 2) // Select Sq.KM
    {
        document.getElementById('Mile_Kilo').value = sp_kilometres.toFixed(1);
    }
    else // Select Sq.Miles
    {
        document.getElementById('Mile_Kilo').value = area.toFixed(1);
    }
}



// Function7: selected 'Per Square KM' radio button
function ChangeSqKm() {

     document.getElementById('mile').checked = false;
     document.getElementById('kilo').checked = true;

     var sp_kilometres = 0.0;
     var Density = 0.0
     sp_kilometres = area * 2.6;
     Density = population/sp_kilometres;

     document.getElementById('pop_density').value = Density.toFixed(2);
 }

 // Function8: selected 'Per Square Miles' radio button
function ChangeSqMile() {

    document.getElementById('mile').checked = true;
    document.getElementById('kilo').checked = false;

    document.getElementById('pop_density').value = Population_Density.toFixed(2);
}

// Function9: Connect to WikiPedia website for country
function ConnectWiki()
{
    var url = `http://en.wikipedia.org/wiki/${country_name}`;
    window.open(url,"_blank");
}


// Event listener1: Select country in the select box
document.getElementById('country_select').addEventListener("change", DisplayCountryData);

// Event listener2: Select Are in
document.getElementById('area_block').addEventListener("change", CalculateKilloMile);

// Event listener3: Click 'Wiki country' button
document.getElementById('wiki').addEventListener("click", ConnectWiki);

// Event listener4: selected 'Per Square KM' radio button in Population Density
document.getElementById('kilo').addEventListener("click", ChangeSqKm);

// Event listener5: selected 'Per Square Mile' radio button in Population Density
document.getElementById('mile').addEventListener("click", ChangeSqMile);
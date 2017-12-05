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
var xmlhttp = new XMLHttpRequest();
var country_name = "";
var area = 0.0;
var population = 0;
var world_population = 0.0;
var rate_per_worl = 0.0;
var Population_Density = 0.0;


// *** Function Part ***
// Function: Open the json file and load data
function OpenJason() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            array = JSON.parse(this.responseText);
            GetSelectValue();
        }
    };
    xmlhttp.open("GET", "script/countries.json", true);
    xmlhttp.send();
}

// Function: Display country list in select
function GetSelectValue()
{
    var option_value = "<option>Select Country</option>";

    for (var i = 0; i < array.length; i++) {
        option_value += `<option value=${i}>${array[i].Name}</option>`;
    }
    document.getElementById('country_select').innerHTML = option_value;
}

// Function: Display number with comma
function Display_num(displaynumber)
{
    //JavaScript Regular Expression: I refer from the Internet
    return displaynumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Function: Change Flag
function ChangeFlag(country)
{
    var target_element = document.getElementById('flag');
    var change_value = "";
    var flag_name = "";
    var under_bar = "_"

    // change file name with "_"
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
    change_value +=`<img src="flags/${flag_name}.png" alt=\"Countries of The World\" />\n`;
    target_element.innerHTML = change_value;
}

// Function: Display country information in each element
function DisplayCountryData()
{
    area = 0.0;
    population = 0;
    world_population = 0.0;
    rate_per_worl = 0.0;
    Population_Density = 0.0;

    //Get index number from selected country name
    // This index number is same the oder number of array
    var first_select = document.getElementById("country_select");
    var selected_index = first_select.options[first_select.selectedIndex].value;

    // Sum of the population all countries
    for (var i = 0; i < array.length; i++) {
        world_population += parseInt(array[i].Population);
    }

    //Input value to variables from 'array = JSON.parse(this.responseText);'
    country_name = array[selected_index].Name;
    population = parseFloat(array[selected_index].Population);
    area = parseFloat(array[selected_index].Area);
    var numeric = Display_num(population); // change number with "," per three digit

    Population_Density = population/area; // Calculate Population Density
    rate_per_worl = (population/world_population)*100; // Calculate Percentage of World Population:

    //document.getElementById('pop_country').value = population;
    document.getElementById('pop_country').value = numeric;
    document.getElementById('Mile_Kilo').value = area.toFixed(1);
    document.getElementById('pop_density').value = Population_Density.toFixed(2);
    document.getElementById('world_pop').value = `${rate_per_worl.toFixed(3)}`+`%`;
    ChangeFlag(country_name);

    document.getElementById("area_block").value = 1; //Default set is Miles
    document.getElementById('mile').checked = true;  //Default set is per square mile
}

// Function: Display Area in Sq.Miles or Sq.kilometres
function CalculateKilloMile() {
    var sq_miles = 0.0;
    var sp_kilometres = 0.0;
    var second_select = document.getElementById("area_block");
    var selected_index = second_select.options[second_select.selectedIndex].value;
    // 1 mile = 1.609347 km
    //Therefore, 1 Sq.Miles = 1.609347*1.609347 = 2.589997766409, around 2.6 Sq.kilometres
    sq_miles = area.toFixed(1);
    sp_kilometres = sq_miles * 2.6;

    if(selected_index == 2)
    {
        document.getElementById('Mile_Kilo').value = sp_kilometres.toFixed(1);
    }
    else
    {
        document.getElementById('Mile_Kilo').value = area.toFixed(1);
    }
}

// Function: Connect to WikiPedia website for country
function ConnectWiki()
{
    var url = `http://en.wikipedia.org/wiki/${country_name}`;
    window.open(url,"_blank");
}

// Function: selected 'Per Square KM' radio button
// function ChangeSqKm() {
//     document.getElementById('mile').checked = false;
//     document.getElementById('kilo').checked = true;

    // var sq_miles = 0.0;
    // var sp_kilometres = 0.0;
    // var Density = 0.0
    // var num_people = parseFloat(array[selected_index].Population);
    // sq_miles =  parseFloat(array[selected_index].Area);
    // sp_kilometres =sq_miles * 2.6;
    // Density = num_people/sp_kilometres;
    //
    //  document.getElementById('pop_density').value = Density.toFixed(2);
 // }



// Event listener1: Select country in the select box
document.getElementById('country_select').addEventListener("change", DisplayCountryData);

// Event listener2: Select Are in
document.getElementById('area_block').addEventListener("change", CalculateKilloMile);

// Event listener3: Click 'Wiki country' button
document.getElementById('wiki').addEventListener("click", ConnectWiki);

// Event listener4: selected 'Per Square KM' radio button in Population Density
document.getElementById('kilo').addEventListener("change", ChangeSqKm);

// Event listener5: selected 'Per Square Mile' radio button in Population Density
//document.getElementById('mile').addEventListener("checked", ChangeSqMile);
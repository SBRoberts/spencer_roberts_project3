const app = {};

// disease window classes - DOM
const diseaseContainer = $('.disease-container')
const diseaseStats = diseaseContainer.find('disease-stats')
const diseaseStatsEvoPts = diseaseStats.find('evolution-points')

// region window classes - DOM
const regionInfo = $('.region-info')
const regionPopOnDom = regionInfo.find('.population')
const regionAfflicOnDom = regionInfo.find('.afflictions')
const regionGovOnDom = regionInfo.find('.government-affairs')
const regionInfraOnDom = regionInfo.find('.services-infrastructure')

// MAIN DISEASE OBJECT
// REMAINS MUTABLE
app.disease = {
    info: {
        evoPts: 10000,
        avgInfections: 0,
        avgDeaths: 0,
    },
    coreProps: {
        lethality: 1,
        infectivity: 5,
        visibility: 0,
        // resist attrs are not camel case because html data tag converts camel case to lwr case
        coldresist: 0,
        heatresist: 0,
        moistureresist: 0,
        drugresist: 0,
    },
    modifiers: {
        // resistance: {
        //     cold: 0,
        //     heat: 0,
        //     moisture: 0,
        //     drug: 0,
        // },
        transmission: {
            airborne: false,
            waterborne: false,
            rodent: false,
            insect: false,
        },
        traits: {
            virus: false,
            bacteria: false,
            parasite: false,
            bonus:[
                {catching: false},
                {durable: false},
                {bloodyVomit: false},
                {bloodLetter: false},
                {decomposer: false},
                {ablaze: false},
                {biohazard: false},
                {famous: false},
                {cured: false},
                {isolated: false},
                {expected: false},
                {apocalyptic: false},
                {mutator: false},
                {stealthy: false},
                {harmless: false},
                {immune: false},
                {headPopper: false},
            ],
        }
    }
}

// MAIN WORLD OBJECT - REPRESENTS GAMEBOARD
// REMAINS MUTABLE TO KEEP TRACK OF GAME STATE
app.world = {
    info:{
        alivePop: 0,
        deadPop: 0,
        healthyPop: 0,
        infectedPop: 0,
    },
    dayTimer: 0,
    dayCount: 0,
    vaccine: {
        cureDevelopment: 0,
        cureDeployment: 0,
    },
    clock: setInterval(function () {
        if (app.world.dayTimer === 24) {
            app.world.dayCount++;
            app.world.dayTimer = 0;
        }
        app.world.dayTimer++;
        app.updateOnTick()
        console.log(`Day Timer: ${app.world.dayTimer}, Day Count: ${app.world.dayCount}`)
        // console.log(app.world.info.deadPop);
        
    }, 500),
}
// A global variable for my world info obj, because I seem to use it a lot
const worldInfo = app.world.info;

// MAIN REGIONS ARRAY
// REMAINS MUTABLE TO ALLOW FOR UNIVERAL CHANGES (like when an item is purchased)
app.regions = [ 
    // 21 - Total
    // Americas
    {
        name:"South America",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility:0,
        population:{
            alive: 422500000,
            infected:0,
            dead:0,
            healthy: 0,
        },
        transmission:{
            insect: true,
            waterborne: true,
        },
        infrastucture:{
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        }, 
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Central America",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 42000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            airborne: false,
            waterborne: false,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "North America",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 579000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            airborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "The Far North",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 15000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            airborne: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    // Europe
    {
        name: "Britain, Ireland, Scotland & Wales",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 66000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Western Europe",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 397500000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            airborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Eastern Europe",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 291900000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Scandinavia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 21200000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            insect: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Greenland",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 56000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
            airborne: true,
            waterborne: false,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    // Asia
    {
        name: "The Middle East",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 254400000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Central Asia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 105000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "East Asia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 1650850000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            airborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "South East Asia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 397500000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Japan",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 127000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    // Africa
    {
        name: "West Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 367000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "East Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 434900000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            airborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Central Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 4750000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            airborne: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Southern Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 66000000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            insect: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
    {
        name: "Madagascar",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 24800000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            waterborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },

    // Oceania
    {
        name: "Oceania",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 41200000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            insect: true,
            airborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },

    // Russia
    {
        name: "Russia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            alive: 144300000,
            infected: 0,
            dead: 0,
            healthy: 0,
        },
        transmission: {
            rodent: true,
            airborne: true,
        },
        infrastucture: {
            airports: true,
            shipyards: true,
            hospitals: true,
            transit: true,
            schools: true,
        },
        afflictions: {
            riots: false,
            floods: false,
            drought: false,
            hurricane: false,
            earthquake: false,
        },
        government: {
            noWater: false,
            noMasks: false,
            rodentsExterm: false,
            curfew: false,
            martialLaw: false,
            cremation: false,
        },
    },
]

app.forcePause = () => {
    clearInterval(app.world.clock)
}
// Helper Functions
const chanceRoll = (d) => {
    const success = Math.random() <= d;
    return success;
}

// MAIN CLOCK FOR GAME
// THIS FUNCTION DICTATES 
app.regionUpdate = () => {
    // reset global stats in order to recalc them
    worldInfo.alivePop = 0;
    worldInfo.deadPop = 0;
    worldInfo.infectedPop = 0;
    worldInfo.healthyPop = 0;
    // for every region
    app.regions.forEach((region) => {
        // console.log(worldInfo.alivePop, worldInfo.deadPop, worldInfo.infectedPop, worldInfo.healthyPop  )
        const regionPop = region.population;

        // base region infectivity
        region.infectivity = app.disease.coreProps.infectivity/100;

        // base region lethality
        region.lethality = app.disease.coreProps.lethality / 100;

        // base region visibility
        region.visibility = app.disease.coreProps.visibility;

        // Expose region if one of the diseases transmission methods are found
        for(activeTransmissionMethod in region.transmission){
            if (region.transmission[activeTransmissionMethod] === true && region.transmission[activeTransmissionMethod] === app.disease.modifiers.transmission[activeTransmissionMethod] && region.status !== "infected"){
                region.status = "exposed"
                // console.log(region.status, region.name)
            }
        }
        // chance to infect region
        if (region.status === "exposed" && chanceRoll(region.infectivity)){
            region.status = "infected"
            // console.log(region.status, region.name)
        }
        
        if (region.status === "infected" && chanceRoll(region.infectivity)){
            // GLOBAL TRAITS
            // on every update reset to 0, then proceed
            // worldInfo.alivePop, worldInfo.infectedPop, worldInfo.healthyPop, worldInfo.deadPop = 0;
            const count = 1;

            // set alive population
            worldInfo.alivePop += regionPop.alive;

            // set healthy population
            worldInfo.healthyPop += regionPop.healthy;

            // set infected population
            worldInfo.infectedPop += regionPop.infected;

            // set global dead population
            worldInfo.deadPop += regionPop.dead;

            // REGION TRAITS
            // set alive population

            // set infected population
            if (region.population.healthy > 0){
                regionPop.infected += Math.floor(regionPop.healthy * (region.infectivity / 10000));
                // region.population.infected += Math.floor(regionPop.healthy * (region.infectivity));
                // console.log(region.name, region.population)
                
            }
            // set healthy population
            regionPop.healthy = 0;
            regionPop.healthy = regionPop.alive - regionPop.infected;


        }
        // set dead population
        if (chanceRoll(region.lethality) && region.lethality >= .01 && regionPop.alive / regionPop.infected >= .01) {
            // console.log(regionPop.infected / regionPop.healthy);
            
            regionPop.dead += Math.floor(regionPop.infected * (region.lethality))
            regionPop.alive -= regionPop.dead;

            // console.log('LuL @ ded PEEP <-------',regionPop.dead)
        }
    });
}

// returns an object of the region the user clicked on
app.regionFilter = (key) => {
    const filter = app.regions.filter((region) => {
        const regionName = region[key].toLowerCase()
        if (regionName === app.countryId) {
            return region
        };
    })
    return filter
}

// update active region updated on command
app.refreshActiveRegion = () => {
    app.activeRegion = app.regionFilter('name')[0];

    // empty .region-info on click
    regionInfo.find('ul').empty()
    regionInfo.find('.region-name').empty()

    // add region name to region-info div on click
    regionInfo.find('.region-name').append(app.countryId)
    // for the region I clicked on, iterate through all the regions and find me region whose name matches
    if (app.activeRegion && app.activeRegion.name.toLowerCase() === app.countryId) {

        // get region population status on dom
        for (let populus in app.activeRegion.population) {
            regionPopOnDom.find('ul').append(`
                    <li>${populus} | ${app.activeRegion.population[populus]}</li>   
                `)
        }

        // get region affliction status on dom - style for true or false
        for (let afflictions in app.activeRegion.afflictions) {
            regionAfflicOnDom.find('ul').append(`
                    <li>${afflictions} are in effect</li>
                `)

            if (app.activeRegion.afflictions[afflictions] === true) {
                regionAfflicOnDom.find('li').css('color', 'blue')
            } else {
                regionAfflicOnDom.find('li').css('color', 'inherit')
            }
        }

        // get region government-affairs status on dom - style for true or false
        for (let item in app.activeRegion.government) {

            // format text for each option (ugh)
            if (item === "noWater") {
                regionGovOnDom.find('ul').append(`<li>Not handing out water</li>`)
            }
            if (item === "noMasks") {
                regionGovOnDom.find('ul').append(`<li>Not handing out masks</li>`)
            }
            if (item === "rodentsExterm") {
                regionGovOnDom.find('ul').append(`<li>Not exerminating rodents</li>`)
            }
            if (item === "curfew") {
                regionGovOnDom.find('ul').append(`<li>Curfews are not enforced</li>`)
            }
            if (item === "martialLaw") {
                regionGovOnDom.find('ul').append(`<li>Martial law not in effect</li>`)
            }
            if (item === "cremation") {
                regionGovOnDom.find('ul').append(`<li>Dead bodies not being burned</li>`)
            }

            // styles if condition is true/false
            if (app.activeRegion.government[item] === true) {
                regionAfflicOnDom.find('li').css('color', 'blue')
            } else {
                regionAfflicOnDom.find('li').css('color', 'inherit')
            }
        }

        // get region infrastructure status on dom - style for true or false
        for (let thing in app.activeRegion.infrastucture) {

            // format text for each option (ugh)
            if (thing === "airports") {
                regionInfraOnDom.find('ul').append(`<li>Airports are open</li>`)
            }
            if (thing === "shipyards") {
                regionInfraOnDom.find('ul').append(`<li>Shipyards are open</li>`)
            }
            if (thing === "hospitals") {
                regionInfraOnDom.find('ul').append(`<li>Hospitals are open</li>`)
            }
            if (thing === "transit") {
                regionInfraOnDom.find('ul').append(`<li>Transit is open</li>`)
            }
            if (thing === "schools") {
                regionInfraOnDom.find('ul').append(`<li>Schools are open</li>`)
            }

            // styles if condition is true/false
            if (app.activeRegion.infrastucture[thing] === true) {
                regionInfraOnDom.find('li').css('color', 'blue')
            } else {
                regionInfraOnDom.find('li').css('color', 'inherit')
            }
        }
    }
}

$('.region').on('click', function(){
    app.countryId = this.getAttribute("id").split('-').join(" ");
    
    app.refreshActiveRegion()
    
});

// get all properties from an input object, find matching values in an target object & do math
app.applyPurchase = (inputObj, targetObj, posNeg) => {
    for (let prop in inputObj) {
        if (targetObj[prop] !== undefined) {
            if (typeof targetObj[prop] === 'number'){
                targetObj[prop] += inputObj[prop] * posNeg
                console.log(targetObj)
            } else{
                targetObj[prop] = posNeg;
                console.log(targetObj)
            }
        }
    }
}

// when a purchaseable item's button is sumbitted - initiates event listener
app.buyFunctionality = () => {
    $('button').on('click', function(){
        let purchased = $(this).data("purchased")
        const buyCost = $(this).data("buy")
        const sellCost = $(this).data("sell")
        const allData = $(this).data()
        const updateEvoPts = () => $(".evolution-points").html(`<h4>Evolution Points: ${app.disease.info.evoPts}</h4>`)
        // console.log(allData)
        
        // if item is not purchased, allow user to buy, check to see if they can afford it
        if (!purchased && app.disease.info.evoPts >= buyCost) {
            // get confirmation of action
            const confirmAct = confirm(`Cost to purchase: ${buyCost}`)
    
            // if confirmAct true
            if (confirmAct) {
    
                // update evolution pts
                app.disease.info.evoPts -= buyCost
    
                // chnaged purchased attr to true
                $(this).data("purchased", true)
    
                // update disease info
                updateEvoPts();
    
                // applied purchased item's stats
                app.applyPurchase(allData, app.disease.coreProps, 1)
                app.applyPurchase(allData, app.disease.modifiers.transmission, true)
                // console.log($(this).parent().parent());
                
                console.log('BOUGHT')
    
            }
        // if item is  purchased, allow user to sell, check to see if they can afford it
        } else if (purchased && app.disease.info.evoPts >= sellCost){
            // get confirmation of action
            const confirmAct = confirm(`Cost to sell: ${sellCost}`)
    
            // if confirmAct true
            if (confirmAct) {
                // update evolution pts
                app.disease.info.evoPts -= sellCost
    
                // change purchased attr to true
                $(this).data("purchased", false)
    
                // update disease info
                updateEvoPts()
    
                // applied purchased item's stats ** subtract since we're selling
                app.applyPurchase(allData, app.disease.coreProps, -1)
                app.applyPurchase(allData, app.disease.modifiers.transmission, false)
    
                console.log('SOLD')
            }
        } else{
            alert("You can't afford this.")
        }
        
    });
}

app.gameSetup = () => {
    
};

app.updateDiseaseInfo = () => {
}

app.updateOnTick = () => {
    // to ensure we are using a real number, add a delay w/ an if statement
    if (app.world.info.infectedPop > 1000){
        $(".avg-infections").html(`<h4>Avg Infections/day: ${Math.floor(app.world.info.infectedPop / app.world.dayCount)}</h4>`)
        $(".avg-deaths").html(`<h4>Avg Deaths/day: ${Math.floor(app.world.info.deadPop / app.world.dayCount)}</h4>`)
        // console.log(Math.floor(app.world.info.infectedPop / app.world.dayCount))
    }
    app.regionUpdate()
    app.vaccineStatus()
    app.refreshActiveRegion()
}

// Developing a lose condition
// let vaccineDayCount = 0
app.vaccineStatus = () => {
    // when visibility reaches a certain level, give
    if(app.disease.coreProps.visibility >= 10){
        // count 10 days, adding 1 to the deployment status every time
        if (app.world.dayTimer === 1) {
            app.world.vaccine.cureDevelopment ++
            console.log(app.world.vaccine)
        }
        
        // if cure is developed, begin to deploy it
        if (app.world.vaccine.cureDevelopment > 1){
            
            // setting the number of days until user loses
            if (app.world.vaccine.cureDeployment >= 1){
                $('.game-over').remove()
                $('.game-window').append(`
                <div class="game-over">Game Over</div>
                `)
            }
            // count 20 days, adding 1 to the deployment status every time
            if(app.world.dayTimer === 1){
                app.world.vaccine.cureDeployment ++
            }
        }
    }
}

// check every tick to see if user wins!
app.winCondition = () => {
    if(!app.world.info.alivePop){
        $('.winner').remove()
        $('.game-window').append(`
                <div class="winner">You Win</div>
                `)
    }
}


app.init = () => {
    // app.forcePause()
    app.regionUpdate()
    app.updateDiseaseInfo()
    app.buyFunctionality()
}

$(function(){
    app.init()
});

// Region structure
// 1. status: clean, infected, dead
// 2. afflictions - object with affliction bools - changes randomly as world event
// 3. services and infrastructure - bools - chages based on core props
// 4. government affairs - bool - changes more randomly if % of infected
// 5. population - changes each tick
//     0. healthy
//     1. infected
//     2. dead
//     3. alive

// When something is purchased
// 1. reduce currency
// 2. change modifier to true
// 3. call the core props calc function | determines the value change from each modifier
//      (oh boy...)
// 4. call the world update function | 

// Building purchasable items
// 1. hard code each purchasable item in the dom as buttons
// 1.1 in JS, on button click, get the retrive evoPts data tag value and subtract from current amt
// 1.2 if evoPts >= currnt pts get item.val() and use it to turn its disease value to true
// 1.3 call function that contains if statements for each item
// ** program all "user-selectable" things as items, set the cost to 0 if need be. 

// Every tick
// 1. scan each region
// 1.1.connectedRegions
//     - if transmission method is active && infection rate is sufficiant, chance to change
//         - code: app.country.connectedRegions.forEach(region) -> chance to change app[region].status
// 1.2. calculate the number of people infected
//     - percentage of total uninfected people
//     - subtract that number from uninfected people
//     - move uninfected region to infected region list
//     - give x evoPts for per y % of people infected in a region
// 1.3. calculate the number of people killed
//     - function of lethality and % infected ppl in region - only activates if lethaity is over a certain level
//     - move infected region to forsaken region list if prudent
//     - give x evoPts for per y % of people killed in a region
// 2. calculate vaccine status
//     - arguably most complicated part
//     ~~ for hospitals ~~
//     - scan each infected country to calculate the number of total and active hospitals
//         - a hospital is false if x % of people are infected && y % percent of people are dead
//     - vaccine completion && deployment
//         - does not start until visibility is over a certain level
//         - number of active hospitals, visibility && lethality increases completion rate
//         - when completion rate reaches 100, start deployment
//         - when deployment reaches 100 the user gets 10 days to try to win.



// ** calc chance to spread/infect region based on new chance prop on region
// **
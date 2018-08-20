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
        evoPts: 100,
        avgInfections: 0,
        avgDeaths: 0,
    },
    coreProps: {
        lethality: 0,
        infectivity: 0,
        visibility: 0,
        // resist attrs are not camel case because html data tag converts camel case to lwr case
        coldresist: 0,
        heatresist: 0,
        moistureresist: 0,
        drugresist: 0,
    },
    modifiers: {
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
            bonus:{
                catching: false,
                durable: false,
                bloodyVomit: false,
                bloodLetter: false,
                decomposer: false,
                ablaze: false,
                biohazard: false,
                famous: false,
                cured: false,
                isolated: false,
                expected: false,
                apocalyptic: false,
                mutator: false,
                stealthy: false,
                harmless: false,
                immune: false,
                headPopper: false,
            },
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

            // calling this app.grantEvoPts() here to stagger when functions are called
            app.grantEvoPts()
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
        chance: .01,
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
        afflictions: [
            {riots: false,},
            {floods: false,},
            {drought: false,},
            {hurricane: false,},
            {earthquake: false,},
        ],
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
        chance: .005,
        population: {
            alive: 42000000,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .005,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        name: "The British Isles",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .009,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .003,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .011,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .005,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .02,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .001,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .007,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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
        chance: .01,
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
        afflictions: [
            { riots: false, },
            { floods: false, },
            { drought: false, },
            { hurricane: false, },
            { earthquake: false, },
        ],
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

// UPDATES ALMOST EVERY ASPECT OF EACH REGION
app.regionUpdate = () => {
    // empty region status on dom, then redetermine which regions are infected, healthy/forsaken
    $('.disease-status').find('.clean-regions').empty()
    $('.disease-status').find('.infected-regions').empty()
    $('.disease-status').find('.dead-regions').empty()
    worldInfo.deadPop = 0;

    worldInfo.infectedPop = 0;

    worldInfo.healthyPop = 0;

    // for every region
    app.regions.forEach((region) => {
        app.setGlobalPopulationStats(region)
        app.globalEvent(region)

        // REGION - base multpliers
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

            // set infected population
            if (region.population.healthy > 0){
                regionPop.infected += Math.floor(regionPop.healthy * (region.infectivity / 10000));
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

        // GLOBAL TRAITS
        // on every global reset to 0, then proceed
        worldInfo.alivePop, worldInfo.infectedPop, worldInfo.healthyPop, worldInfo.deadPop = 0;

        // set global healthy population
        worldInfo.healthyPop += regionPop.healthy;
        
        // set global infected population
        worldInfo.infectedPop += regionPop.infected;
        
        // set global global dead population
        worldInfo.deadPop += regionPop.dead;

        // set global alive population
        worldInfo.alivePop -= regionPop.dead;
    });
}

// Global event trigger
app.globalEvent = (region) => {
    // seperate chance rolls for each type of event

    // roll for affliction change
    if(chanceRoll(region.chance)){
        const randomAffliction = region.afflictions[Math.floor(Math.random() * region.afflictions.length)]
        const randomAfflictionKey = Object.keys(randomAffliction)[0]

        randomAffliction[randomAfflictionKey] = true;

        if (randomAfflictionKey === 'earthquake' && app.disease.modifiers.transmission.rodent){
            region.infectivity += 3
            region.lethality += 3
        }
        if (randomAfflictionKey === 'flood' && app.disease.modifiers.transmission.waterborne) {
            region.infectivity += 3
            region.lethality += 3
        }
        if (randomAfflictionKey === 'drought' && app.disease.modifiers.transmission.insect) {
            region.infectivity += 3
            region.lethality += 3
        }
        if (randomAfflictionKey === 'hurricane' && app.disease.modifiers.transmission.airborne) {
            region.infectivity += 3
            region.lethality += 3
        }
        if (randomAfflictionKey === 'riots') {
            region.infectivity += 3
            region.lethality += 3
        }
        
    };
    // iterate through each region, chance to turn world event off if it's on
    region.afflictions.forEach((affliction) => {
        if (affliction[Object.keys(affliction)] && (chanceRoll(region.chance) * 2)){
            // console.log(region);
            affliction[Object.keys(affliction)] = false;
            region.infectivity -= 3
            region.lethality -= 3
            // console.log(region);
        }
    });

    if(!region.government.noWater && app.disease.modifiers.transmission.waterborne && region.transmission.waterborne && chanceRoll(region.chance) && app.disease.coreProps.visibility > 10){
        region.transmission.waterborne = true;
        // console.log(`noWater on`);
        
    } else if (region.government.noWater && chanceRoll(region.chance)){
        region.transmission.waterborne = false;
        // console.log(`noWater off`);
    }

    if (!region.government.noMasks && app.disease.modifiers.transmission.airborne && region.transmission.airborne && chanceRoll(region.chance) && app.disease.coreProps.visibility > 10) {
        region.transmission.airborne = false;
        // console.log(`noMasks on`);
    } else if (region.government.noMasks && chanceRoll(region.chance)) {
        region.transmission.airborne = true;
        // console.log(`noMasks off`);
    }

    if (!region.government.rodentsExterm && app.disease.modifiers.transmission.rodent && region.transmission.rodent && chanceRoll(region.chance) && app.disease.coreProps.visibility > 10) {
        region.transmission.rodent = false;
        // console.log(`rodentsExterm on`);
    } else if (region.government.rodentsExterm && chanceRoll(region.chance)) {
        region.transmission.rodent = true;
        // console.log(`rodentsExterm off`);
    }

    if (!region.government.curfew && app.disease.coreProps.visibility > 14) {
        region.infectivity -= 2
        // console.log(`curfew on`);
    } else if (region.government.curfew && chanceRoll(region.chance)) {
        region.infectivity += 2
        // console.log(`curfew off`);
    }

    if (!region.government.martialLaw && app.disease.coreProps.visibility > 17) {
        region.lethality += 2
        // console.log(`martialLaw on`);
    } else if (region.government.martialLaw && chanceRoll(region.chance)) {
        region.lethality -= 2
        // console.log(`martialLaw off`);
    }

    if (!region.government.cremation && app.disease.coreProps.visibility > 19) {
        region.infectivity -= 2
        region.lethality += 2
        // console.log(`cremation on`);
    } else if (region.government.cremation && chanceRoll(region.chance)) {
        region.infectivity += 2
        region.lethality -= 2
        // console.log(`cremation off`);
    }
    
};

app.setGlobalPopulationStats = (region) => {
    if (region.status === "clean" || region.status === "exposed") {
        $('.disease-status').find('.clean-regions').append(`<h4 class="region">${region.name}</h4>`)
    }
    if (region.status === "infected") {
        $('.disease-status').find('.infected-regions').append(`<h4 class="region">${region.name}</h4>`)
    }
    if (region.status === "dead") {
        $('.disease-status').find('.dead-regions').append(`<h4 class="region">${region.name}</h4>`)
    }
};

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
        for (let affliction in app.activeRegion.afflictions) {
            const key = Object.keys(app.activeRegion.afflictions[affliction])[0]

            // if thing shuts down, alert user
            const ifThingShutsDown = () => {
                if (app.activeRegion.afflictions[affliction][key]) {
                    console.log(`${key} are happening in ${app.activeRegion.name}`);
                    $('.alert-window').append(`${key} are happening in ${app.activeRegion.name}`);
                }
            };
            
            regionAfflicOnDom.find('ul').append(`
                    <li class ="global-event affliction ${key}">${key} in effect</li>
                `)

            // console.log(key, app.activeRegion.afflictions[affliction][key]);
            if (app.activeRegion.afflictions[affliction][key] === true) {
                regionAfflicOnDom.find(`.${key}`).addClass('global-event--active')
            } else {
                regionAfflicOnDom.find('li').removeClass('global-event--active')
            }
        }

        // get region government-affairs status on dom - style for true or false
        for (let item in app.activeRegion.government) {
            const activeRegionGov = app.activeRegion.government

            // format html for each option (ugh)
            if (item === "noWater") {
                regionGovOnDom.find('ul').append(`<li class="global-event ${item}">Not handing out water</li>`)

                // Setting the implication if event is active 
                if (activeRegionGov[item]) {
                    $('.alert-window').append(`Water not being handed out in ${app.activeRegion.name}`);
                }
            }
            if (item === "noMasks") {
                regionGovOnDom.find('ul').append(`<li class="global-event ${item}">Not handing out masks</li>`)

                // Setting the implication if event is active 
                if (activeRegionGov[item]) {
                    $('.alert-window').append(`Masks not being handed out in ${app.activeRegion.name}`);
                }
            }
            if (item === "rodentsExterm") {
                regionGovOnDom.find('ul').append(`<li class="global-event ${item}">Not exerminating rodents</li>`)

                // Setting the implication if event is active 
                if (activeRegionGov[item]) {
                    $('.alert-window').append(`Rodents are being exterminated in ${app.activeRegion.name}`);
                }
            }
            if (item === "curfew") {
                regionGovOnDom.find('ul').append(`<li class="global-event ${item}">Curfews are not enforced</li>`)

                // Setting the implication if event is active 
                if (activeRegionGov[item]) {
                    $('.alert-window').append(`Rodents are being exterminated in ${app.activeRegion.name}`);
                }
            }
            if (item === "martialLaw") {
                regionGovOnDom.find('ul').append(`<li class="global-event ${item}">Martial law not in effect</li>`)
                
                // Setting the implication if event is active 
                if (activeRegionGov[item]) {
                    $('.alert-window').append(`Martial Law being enforced in ${app.activeRegion.name}`);
                }
            }
            if (item === "cremation") {
                regionGovOnDom.find('ul').append(`<li class="global-event ${item}">Dead bodies not being burned</li>`)
                // Setting the implication if event is active 
                if (activeRegionGov[item]) {
                    $('.alert-window').append(`Bodies are being burned in ${app.activeRegion.name}`);
                }
            }

            // styles if condition is true/false
            if (app.activeRegion.government[item] === true) {
                regionAfflicOnDom.find(`.${item}`).addClass(`global-event--active`)
            } else {
                regionAfflicOnDom.find(`.${item}`).addClass(`global-event--active`)
            }
        }

        // get region infrastructure status on dom - style for true or false
        for (let thing in app.activeRegion.infrastucture) {

            const activeRegionInfra = app.activeRegion.infrastucture;

            // helper function to create notification if thing shuts down
            const ifThingShutsDown = () => {
                // if thing shuts down, alert user
                if (!activeRegionInfra[thing]) {
                    $('.alert-window').append(`${thing} are closed in ${app.activeRegion.name}`);
                }
            };

            // format text for each option (ugh)
            if (thing === "airports") {
                regionInfraOnDom.find('ul').append(`<li class="global-event ${thing}">Airports are open</li>`)
                ifThingShutsDown()
            }
            if (thing === "shipyards") {
                regionInfraOnDom.find('ul').append(`<li class="global-event ${thing}">Shipyards are open</li>`)
                ifThingShutsDown()
            }
            if (thing === "hospitals") {
                regionInfraOnDom.find('ul').append(`<li class="global-event ${thing}">Hospitals are open</li>`)
                ifThingShutsDown()
            }
            if (thing === "transit") {
                regionInfraOnDom.find('ul').append(`<li class="global-event ${thing}">Transit is open</li>`)
                ifThingShutsDown()
            }
            if (thing === "schools") {
                regionInfraOnDom.find('ul').append(`<li class="global-event ${thing}">Schools are open</li>`)
                ifThingShutsDown()
            }

            // styles if condition is true/false
            
            if (activeRegionInfra[thing] === true) {
                // console.log(thing, activeRegionInfra[thing] );
                regionInfraOnDom.find(`.${thing}`).addClass(`global-event--active`)
            } else {
                regionInfraOnDom.find(`.${thing}`).removeClass(`global-event--active`)
            }
        }
    }
}

$('.region').on('click', function(){
    app.countryId = this.getAttribute("id").split('-').join(" ");
    $('.region-info').show(300)
    
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

app.grantEvoPts = () => {
    let evoPts = app.disease.info.evoPts;
    evoPts += Math.floor(Math.random() * ((app.world.info.infectedPop *.0001)  / 2 ) );
    evoPts += Math.floor(Math.random() * ((app.world.info.deadPop * .0001)  / 2 ) );
    app.disease.info.evoPts = evoPts;
    app.updateEvoPts()
    console.log(evoPts);
    
    // app.disease.info.evoPts = ;
}
app.updateEvoPts = () => $(".evolution-points").html(`<h3>Evolution Points: ${app.disease.info.evoPts}</h3>`)
// when a purchaseable item's button is sumbitted - initiates event listener
app.buyFunctionality = () => {
    $('.purchase').on('click', function(){
        let purchased = $(this).data("purchased")
        const buyCost = $(this).data("buy")
        const sellCost = $(this).data("sell")
        const allData = $(this).data()
        
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

                // validate that pruchased === true, add class to button
                if ($(this).data("purchased") === true){
                    $(this).addClass('purchased')
                }
    
                // update disease info
                app.updateEvoPts();
    
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

                // validate that pruchased === false, remove class from button
                if ($(this).data("purchased") === false) {
                    $(this).removeClass('purchased')
                }
    
                // update disease info
                app.updateEvoPts()
    
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
    // hide region info on init
    $('.region-info').hide()

    // hide window on click
    $('.fa-window-close').on('click', function(e){
        $(this).parent().hide(300)
    });

    // display number of evo points
    app.updateEvoPts()
};

// app.updateDiseaseInfo = () => {
// }

app.updateOnTick = () => {
    const worldInfo = $('.world-info')
    // to ensure we are using a real number, add a delay w/ an if statement
    if (app.world.info.infectedPop > 1000){
        $(".avg-infections").html(`<h4>Avg Infections/day: ${Math.floor(app.world.info.infectedPop / app.world.dayCount)}</h4>`)
        $(".avg-deaths").html(`<h4>Avg Deaths/day: ${Math.floor(app.world.info.deadPop / app.world.dayCount)}</h4>`)

        worldInfo.find('.alive').html(`<h4>Alive Population: ${app.world.info.alivePop}</h4>`)
        worldInfo.find('.healthy').html(`<h4>Healthy Population: ${app.world.info.healthyPop}</h4>`)
        worldInfo.find('.infected').html(`<h4>Infected Population: ${app.world.info.infectedPop}</h4>`)
        worldInfo.find('.dead').html(`<h4>Dead Population: ${app.world.info.deadPop}</h4>`)

        // console.log(Math.floor(app.world.info.infectedPop / app.world.dayCount))
    }
    app.regionUpdate()
    app.vaccineStatus()
    app.refreshActiveRegion()
}

// Developing a lose condition
// let vaccineDayCount = 0
app.vaccineStatus = () => {

    const visibilityTarget = 12;
    const cureDevelopmentTime = 20;
    const cureDeploymentTime = 20;

    // when visibility reaches a certain level, give
    if(app.disease.coreProps.visibility >= visibilityTarget){
        // count 10 days, adding 1 to the deployment status every time
        if (app.world.dayTimer === 1) {
            app.world.vaccine.cureDevelopment ++
            $('.vaccine-completion').find('.inner-bar').animate({ width: `${(app.world.vaccine.cureDevelopment / cureDevelopmentTime).toFixed(2) * 100}%`}, 1000)
            $('.vaccine-completion').find('.inner-bar').text(`${(app.world.vaccine.cureDevelopment / cureDevelopmentTime).toFixed(2) * 100}%`)
        }
        
        // if cure is developed, begin to deploy it
        if (app.world.vaccine.cureDevelopment >= cureDevelopmentTime){
            
            // setting the number of days until user loses
            if (app.world.vaccine.cureDeployment >= cureDeploymentTime){
                $('.game-over').remove()
                $('.game-window').append(`
                <div class="game-over">Game Over</div>
                `)
            }
            // count 20 days, adding 1 to the deployment status every time
            if(app.world.dayTimer === 1){
                app.world.vaccine.cureDeployment ++
                $('.vaccine-deployment').find('.inner-bar').animate({ width: `${(app.world.vaccine.cureDeployment / cureDeploymentTime).toFixed(2) * 100}%` }, 1000)
                $('.vaccine-deployment').find('.inner-bar').text(`${(app.world.vaccine.cureDeployment / cureDeploymentTime).toFixed(2) * 100}%`)
            }
        }
    }
}

// A function that contains a bunch of conditionals that activate certain traits
// includes primary disease classes
app.applyTraits = () => {
    const modifiers = app.disease.modifiers.traits
    const bonus = app.disease.modifiers.traits.bonus
    const coreProps = app.disease.coreProps

    const propChange = (eval, infect, lethal, visible) => {
        if(eval){
            coreProps.infectivity += infect;
            coreProps.lethality += lethal;
            coreProps.visibility += visible;
        }
        console.log(coreProps)
    }

    // Disease Classes
    propChange(modifiers.bacteria, 5, 2, 2)
    propChange(modifiers.parasite, 3, 2, 0)
    propChange(modifiers.virus, 6, 2, 3)
}

app.startGame = () => {
    $(".start-game").on('submit', function(e){
        e.preventDefault()
        // hide home screen on form submit
        $(this).parent().parent().hide(700)

        // find the id of the class that the user chose
        const selectedClass = $('.class-type:checked').attr("id")

        // use the id to change the app.disease object accordingly - another function will apply stats 
        app.disease.modifiers.traits[selectedClass] = true;

        // get disease name from input
        app.disease.name = $('.disease-name').val()

        // put the disease name on the dom
        $(".disease-info").find('label').text(`${app.disease.name}`)
        app.applyTraits()
    });

    // set global alive population
    app.regions.forEach((region) => {
        app.world.info.alivePop += region.population.alive;

        // add healthy population to the world stats window on game start
        if (region.status === "clean") {
            $('.disease-status').find('.healthy-regions').append(`<h4 class="region">${region.name}</h4>`)
        }
    });
}

// check every tick to see if user wins!
app.winCondition = () => {
    if(app.world.info.alivePop <= 0){
        $('.winner').remove()
        $('.game-window').append(`
                <div class="winner">You Win</div>
                `)
        app.world.info.alivePop = 0;
    }
}

app.init = () => {
    // app.forcePause()
    app.startGame()
    app.gameSetup()
    app.regionUpdate()
    app.buyFunctionality()
}

$(function(){
    app.init()
});
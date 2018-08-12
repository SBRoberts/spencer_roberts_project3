const app = {};

app.disease = {
    info: {
        evoPts: 20,
        avgInfections: 10,
        avgDeaths: 0,
    },
    coreProps: {
        lethality: 0,
        infectivity: 10,
        visibility: 0,
    },
    modifiers: {
        resistance: {
            cold: 0,
            heat: 0,
            moisture: 0,
            drug: 0,
        },
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

app.world = {
    dayTimer: 0,
    dayCount: 0,
    clock: setInterval(function () {
        if (app.world.dayTimer === 60) {
            app.world.dayCount++;
            app.world.dayTimer = 0;
        }
        app.world.dayTimer++;
        console.log(`Day Timer: ${app.world.dayTimer}, Day Count: ${app.world.dayCount}`)
    }, 500),
}

app.regions = [ 
    // 21 - Total
    // Americas
    {
        name:"South America",
        status: "clean",
        infectivity:0,
        lethality: 0,
        visibility:0,
        population:{
            healthy:422500000,
            infected:0,
            dead:0,
            alive: 0,
        },
        transmission:{
            rodent: false,
            insect: false,
            airborne: false,
            waterborne: false,
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
            healthy: 42000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
            healthy: 579000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "The Far North",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 15000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
    // Europe
    {
        name: "Britain, Ireland, Scotland & Wales",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 66000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Western Europe",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 397500000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Eastern Europe",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 291900000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Scandinavia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 21200000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Greenland",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 56000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
    // Asia
    {
        name: "The Middle East",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 254400000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Central Asia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 105000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "East Asia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 1650850000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "South East Asia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 397500000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Japan",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 127000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
    // Africa
    {
        name: "West Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 367000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "East Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 434900000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Central Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 4750000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Southern Africa",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 66000000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
        name: "Madagascar",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 24800000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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

    // Oceania
    {
        name: "Oceania",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 41200000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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

    // Russia
    {
        name: "Russia",
        status: "clean",
        infectivity: 0,
        lethality: 0,
        visibility: 0,
        population: {
            healthy: 144300000,
            infected: 0,
            dead: 0,
            alive: 0,
        },
        transmission: {
            rodent: false,
            insect: false,
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
]

const forcePause = () => {
    clearInterval(app.world.clock)
}

app.init = () => {
    // app.world.clock()
    // forcePause()
    let totalPop = 0;
    app.regions.forEach((region) => {
        totalPop += region.population.healthy;
    })
    console.log(totalPop);
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

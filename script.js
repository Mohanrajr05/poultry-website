// Inventory state
let inventory = {
    wholeChickens: 100, // Starting with 100 whole chickens
    legs: 0,
    wings: 0,
    flesh: 0
};

// Update inventory display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateInventoryDisplay();
});

// Process order form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get order values
    const legsOrdered = parseInt(document.getElementById('legs').value) || 0;
    const wingsOrdered = parseInt(document.getElementById('wings').value) || 0;
    const fleshOrdered = parseInt(document.getElementById('flesh').value) || 0;
    
    // Process the order
    const result = processOrder(legsOrdered, wingsOrdered, fleshOrdered);
    
    // Display results
    displayResults(result);
    
    // Update inventory display
    updateInventoryDisplay();
});

function processOrder(legs, wings, flesh) {
    // Constants
    const LEGS_PER_CHICKEN = 2;
    const WINGS_PER_CHICKEN = 2;
    const FLESH_PER_CHICKEN = 1;
    const LEG_WEIGHT = 250; // grams
    const WING_WEIGHT = 250; // grams
    const FLESH_WEIGHT = 1000; // grams
    
    // Calculate required chickens for each part
    const chickensForLegs = Math.ceil(legs / LEGS_PER_CHICKEN);
    const chickensForWings = Math.ceil(wings / WINGS_PER_CHICKEN);
    const chickensForFlesh = Math.ceil(flesh / FLESH_PER_CHICKEN);
    
    // Determine total chickens needed (max of the three)
    const totalChickensNeeded = Math.max(chickensForLegs, chickensForWings, chickensForFlesh);
    
    // Calculate parts obtained from these chickens
    const legsObtained = totalChickensNeeded * LEGS_PER_CHICKEN;
    const wingsObtained = totalChickensNeeded * WINGS_PER_CHICKEN;
    const fleshObtained = totalChickensNeeded * FLESH_PER_CHICKEN;
    
    // Calculate remaining parts after fulfilling order
    const remainingLegs = legsObtained - legs;
    const remainingWings = wingsObtained - wings;
    const remainingFlesh = fleshObtained - flesh;
    
    // Calculate weights
    const orderWeight = (legs * LEG_WEIGHT + wings * WING_WEIGHT + flesh * FLESH_WEIGHT) / 1000; // in kg
    const remainingWeight = (remainingLegs * LEG_WEIGHT + remainingWings * WING_WEIGHT + remainingFlesh * FLESH_WEIGHT) / 1000;
    
    // Update inventory
    inventory.wholeChickens -= totalChickensNeeded;
    inventory.legs += remainingLegs;
    inventory.wings += remainingWings;
    inventory.flesh += remainingFlesh;
    
    return {
        totalChickensNeeded,
        orderWeight,
        remainingLegs,
        remainingWings,
        remainingFlesh,
        remainingWeight,
        legsOrdered: legs,
        wingsOrdered: wings,
        fleshOrdered: flesh
    };
}

function displayResults(result) {
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = `
        <h3>Order Results</h3>
        <div class="result-item">Ordered: 
            ${result.legsOrdered} legs, 
            ${result.wingsOrdered} wings, 
            ${result.fleshOrdered} flesh portions</div>
        <div class="result-item highlight">Total order weight: ${result.orderWeight.toFixed(2)} kg</div>
        <div class="result-item highlight">Whole chickens needed: ${result.totalChickensNeeded}</div>
        <h4>Remaining Parts After Order:</h4>
        <div class="result-item">Legs remaining: ${result.remainingLegs} (${(result.remainingLegs * 0.25).toFixed(2)} kg)</div>
        <div class="result-item">Wings remaining: ${result.remainingWings} (${(result.remainingWings * 0.25).toFixed(2)} kg)</div>
        <div class="result-item">Flesh portions remaining: ${result.remainingFlesh} (${result.remainingFlesh.toFixed(2)} kg)</div>
        <div class="result-item highlight">Total remaining weight: ${result.remainingWeight.toFixed(2)} kg</div>
    `;
}

function updateInventoryDisplay() {
    const inventoryDiv = document.getElementById('inventoryDisplay');
    
    inventoryDiv.innerHTML = `
        <div class="result-item">Whole chickens: ${inventory.wholeChickens}</div>
        <div class="result-item">Available legs: ${inventory.legs} (${(inventory.legs * 0.25).toFixed(2)} kg)</div>
        <div class="result-item">Available wings: ${inventory.wings} (${(inventory.wings * 0.25).toFixed(2)} kg)</div>
        <div class="result-item">Available flesh portions: ${inventory.flesh} (${inventory.flesh.toFixed(2)} kg)</div>
    `;
}
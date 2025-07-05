document.addEventListener("DOMContentLoaded", function () {
    // ✅ 1. Station list
    const stations = [
        "Rithala", "Shaheed Sthal", "Dwarka Sector 21", "Noida City Centre", "Vaishali",
        "Samaypur Badli", "HUDA City Centre", "Inderlok", "Kirti Nagar", "Brigadier Hoshiar Singh",
        "Majlis Park", "Shiv Vihar", "New Delhi", "Airport", "Dwarka Sector 21 (Express)"
    ];

    // ✅ 2. DOM elements
    const fromSelect = document.querySelector('.plan-journey select:nth-of-type(1)');
    const toSelect = document.querySelector('.plan-journey select:nth-of-type(2)');

    // ✅ 3. Function to populate dropdowns
    function populateStations() {
        stations.forEach(station => {
            const fromOption = document.createElement('option');
            const toOption = document.createElement('option');
            fromOption.value = toOption.value = station;
            fromOption.textContent = toOption.textContent = station;
            fromSelect.appendChild(fromOption);
            toSelect.appendChild(toOption);
        });
    }

    // ✅ 4. Populate on page load
    populateStations();

    // ✅ 5. Button event listeners
    document.querySelector('.shortest-route').addEventListener('click', () => {
        const from = fromSelect.value;
        const to = toSelect.value;
        if (from === to || from === "Type station name" || to === "Type station name") {
            alert("Please select two different valid stations.");
        } else {
            alert(`Calculating shortest route from ${from} to ${to}...`);
        }
    });

    document.querySelector('.minimum-interchange').addEventListener('click', () => {
        const from = fromSelect.value;
        const to = toSelect.value;
        if (from === to || from === "Type station name" || to === "Type station name") {
            alert("Please select two different valid stations.");
        } else {
            alert(`Finding route with minimum interchange from ${from} to ${to}...`);
        }
    });

    document.querySelector('.route-fare').addEventListener('click', () => {
        const from = fromSelect.value;
        const to = toSelect.value;
        if (from === to || from === "Type station name" || to === "Type station name") {
            alert("Please select two different valid stations.");
        } else {
            alert(`Calculating fare from ${from} to ${to}...`);
        }
    });
});

// Define metro graph (undirected for simplicity)
const metroGraph = {
    "Rithala": ["Netaji Subhash Place"],
    "Netaji Subhash Place": ["Rithala", "Kashmere Gate", "Inderlok"],
    "Kashmere Gate": ["Netaji Subhash Place", "Central Secretariat"],
    "Central Secretariat": ["Kashmere Gate", "HUDA City Centre"],
    "HUDA City Centre": ["Central Secretariat"],

    "Inderlok": ["Netaji Subhash Place", "Kirti Nagar"],
    "Kirti Nagar": ["Inderlok", "Brigadier Hoshiar Singh"],
    "Brigadier Hoshiar Singh": ["Kirti Nagar"],

    "New Delhi": ["Rajiv Chowk", "Airport"],
    "Airport": ["New Delhi", "Dwarka Sector 21 (Express)"],
    "Dwarka Sector 21 (Express)": ["Airport"],

    "Rajiv Chowk": ["New Delhi", "Noida City Centre"],
    "Noida City Centre": ["Rajiv Chowk"]
};

// Simple BFS for shortest path
function findShortestPath(graph, start, end) {
    const visited = new Set();
    const queue = [[start]];
    
    while (queue.length > 0) {
        const path = queue.shift();
        const station = path[path.length - 1];

        if (station === end) return path;

        if (!visited.has(station) && graph[station]) {
            visited.add(station);
            for (const neighbor of graph[station]) {
                queue.push([...path, neighbor]);
            }
        }
    }

    return null;
}

document.querySelector('.shortest-route').addEventListener('click', () => {
    const from = fromSelect.value;
    const to = toSelect.value;

    if (from === to || from === "Type station name" || to === "Type station name") {
        alert("Please select two different valid stations.");
    } else {
        const path = findShortestPath(metroGraph, from, to);
        if (path) {
            alert(`Shortest path from ${from} to ${to}:\n\n` + path.join(" → "));
        } else {
            alert("No route found between selected stations.");
        }
    }
});
document.querySelector('.minimum-interchange').addEventListener('click', () => {
    const from = fromSelect.value;
    const to = toSelect.value;

    if (from === to || from === "Type station name" || to === "Type station name") {
        alert("Please select two different valid stations.");
    } else {
        // For simplicity, using the same function as shortest path
        const path = findShortestPath(metroGraph, from, to);
        if (path) {
            alert(`Route with minimum interchange from ${from} to ${to}:\n\n` + path.join(" → "));
        } else {
            alert("No route found between selected stations.");
        }
    }
});
const resultDiv = document.getElementById("route-result");

// inside the click handler...
if (path) {
    resultDiv.textContent = `Shortest path: ${path.join(" → ")}`;
} else {
    resultDiv.textContent = "No route found.";
}

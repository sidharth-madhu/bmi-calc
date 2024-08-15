document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('measurement-toggle');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');

    // Function to update the placeholders based on the toggle state
    function updatePlaceholders() {
        if (toggleSwitch.checked) { // US units
            heightInput.placeholder = 'Enter your height in inches';
            weightInput.placeholder = 'Enter your weight in pounds';
        } else { // Metric units
            heightInput.placeholder = 'Enter your height in cm';
            weightInput.placeholder = 'Enter your weight in kg';
        }
    }

    // Initial placeholder update
    updatePlaceholders();

    // Add event listener to the toggle switch to update placeholders on change
    toggleSwitch.addEventListener('change', updatePlaceholders);
});

function calculateBMI() {
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var age = document.getElementById('age').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var toggleSwitch = document.getElementById('measurement-toggle');

    if (height && weight && age && gender) {
        if (toggleSwitch.checked) { // US units
            height = height * 2.54; // Convert inches to cm
            weight = weight * 0.453592; // Convert pounds to kg
        }

        var bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        var status = getStatus(bmi);
        var figureSrc = getFigureImage(status, gender);
        var figureWidth = getFigureWidth(status);
        var quote = getFunnyQuote(status);
        var fact = getBMIFact();
        var statusColor = getStatusColor(status);

        var figure = document.getElementById('bmi-figure');
        var container = document.querySelector('.container');

        figure.src = figureSrc;
        figure.style.width = figureWidth;
        figure.classList.remove('hidden');

        document.getElementById('bmi-value').innerText = bmi;
        document.getElementById('bmi-status').innerText = status;
        document.getElementById('bmi-status').style.color = statusColor;
        document.getElementById('funny-quote').innerText = quote;
        document.getElementById('bmi-fact').innerText = fact;

        // Add animations and adjust container size
        figure.classList.add('animate-slide-in');
        container.classList.add('reduced');
    } else {
        alert('Please enter all the details');
    }
}

function getStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obesity';
}

function getFigureImage(status, gender) {
    if (status === "Underweight") {
        return gender === "male" ? "./image 5.png" : "./image.png";
    } else if (status === "Normal weight") {
        return gender === "male" ? "./image 6.png" : "./image 2.png";
    } else if (status === "Overweight") {
        return gender === "male" ? "./image 7.png" : "./image 3.png";
    } else {
        return gender === "male" ? "./image 8.png" : "./image 4.png";
    }
}

function getFigureWidth(status) {
    switch (status) {
        case 'Underweight':
            return '40px';
        case 'Normal weight':
            return '40px';
        case 'Overweight':
            return '40px';
        case 'Obesity':
            return '50px';
        default:
            return '40px';
    }
}

function getFunnyQuote(status) {
    const quotes = {
        'Underweight': "You’re so light, even the wind is jealous!",
        'Normal weight': "You're as fit as a fiddle, keep it up!",
        'Overweight': "More of you to love—just keep it balanced!",
        'Obesity': "Let's trade that cake for a carrot, shall we?"
    };
    return quotes[status] || "Stay awesome and healthy!";
}

function getBMIFact() {
    const facts = [
        "BMI isn’t everything; it’s just a small piece of the puzzle!",
        "Did you know? Being active for just 30 minutes a day can boost your BMI!",
        "Muscle weighs more than fat, so don’t sweat those extra kilos!",
        "BMI doesn’t know your life story, so don’t let it define you!",
        "Remember: A healthy mind is as important as a healthy body!"
    ];
    return facts[Math.floor(Math.random() * facts.length)];
}

function getStatusColor(status) {
    switch (status) {
        case 'Underweight':
            return '#007BFF'; // Blue
        case 'Normal weight':
            return '#28a745'; // Green
        case 'Overweight':
            return '#ffc107'; // Yellow
        case 'Obesity':
            return '#dc3545'; // Red
        default:
            return '#333'; // Default color
    }
}

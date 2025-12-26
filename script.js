// State
let currentStep = 'mood';
let videoCount = 0;
let selectedMood = '';

// DOM Elements
const moodStep = document.getElementById('mood-step');
const videoStep = document.getElementById('video-step');
const energyStep = document.getElementById('energy-step');
const suggestionStep = document.getElementById('suggestion-step');

const moodButtons = document.querySelectorAll('.mood-btn');
const watchVideoBtn = document.getElementById('watch-video-btn');
const videoCountDisplay = document.getElementById('video-count');
const energySlider = document.getElementById('energy-slider');
const energyDisplay = document.getElementById('energy-display');
const submitEnergyBtn = document.getElementById('submit-energy-btn');
const suggestionText = document.getElementById('suggestion-text');
const restartBtn = document.getElementById('restart-btn');

// Mood selection
moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedMood = btn.dataset.mood;
        showStep('video');
    });
});

// Video watching
watchVideoBtn.addEventListener('click', () => {
    if (videoCount < 2) {
        videoCount++;
        videoCountDisplay.textContent = videoCount;
        
        if (videoCount >= 2) {
            watchVideoBtn.textContent = 'Devam Et';
        }
    } else {
        showStep('energy');
    }
});

// Energy slider
energySlider.addEventListener('input', (e) => {
    energyDisplay.textContent = e.target.value;
});

// Submit energy
submitEnergyBtn.addEventListener('click', () => {
    const energyLevel = parseInt(energySlider.value);
    showSuggestion(energyLevel);
    showStep('suggestion');
});

// Show suggestion based on energy level
function showSuggestion(energy) {
    let suggestion = '';
    
    if (energy >= 0 && energy <= 3) {
        suggestion = 'Bugün bu kadar yeter.';
    } else if (energy >= 4 && energy <= 6) {
        suggestion = '10 dakikalık küçük bir şey yap.';
    } else if (energy >= 7 && energy <= 10) {
        suggestion = 'İstersen biraz daha devam et.';
    }
    
    suggestionText.textContent = suggestion;
}

// Restart
restartBtn.addEventListener('click', () => {
    // Reset state
    currentStep = 'mood';
    videoCount = 0;
    selectedMood = '';
    
    // Reset UI
    videoCountDisplay.textContent = '0';
    energySlider.value = 5;
    energyDisplay.textContent = '5';
    
    // Remove event listeners by cloning button
    const oldBtn = document.getElementById('watch-video-btn');
    const newWatchBtn = oldBtn.cloneNode(true);
    newWatchBtn.textContent = 'Video İzledim';
    oldBtn.parentNode.replaceChild(newWatchBtn, oldBtn);
    
    // Re-attach event listeners
    setupVideoButton();
    
    showStep('mood');
});

// Setup video button (needed after restart)
function setupVideoButton() {
    const btn = document.getElementById('watch-video-btn');
    btn.addEventListener('click', () => {
        if (videoCount < 2) {
            videoCount++;
            videoCountDisplay.textContent = videoCount;
            
            if (videoCount >= 2) {
                btn.textContent = 'Devam Et';
            }
        } else {
            showStep('energy');
        }
    });
}

// Show specific step
function showStep(step) {
    // Hide all steps
    [moodStep, videoStep, energyStep, suggestionStep].forEach(s => {
        s.classList.remove('active');
    });
    
    // Show selected step
    switch(step) {
        case 'mood':
            moodStep.classList.add('active');
            break;
        case 'video':
            videoStep.classList.add('active');
            break;
        case 'energy':
            energyStep.classList.add('active');
            break;
        case 'suggestion':
            suggestionStep.classList.add('active');
            break;
    }
    
    currentStep = step;
}


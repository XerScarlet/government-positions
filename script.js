// Initialize available positions if they don't already exist in localStorage
if (!localStorage.getItem('positions')) {
    localStorage.setItem('positions', JSON.stringify({
        president: false,
        vice_president: false,
        cabinet_member: false,
        senator: false,
        representative: false,
        house_speaker: false,
        supreme_court_justice: false,
        chief_justice: false,
        district_judge: false
    }));
}

// Function to pick a position
function pickPosition(position) {
    const positions = JSON.parse(localStorage.getItem('positions'));
    const resultText = document.getElementById('result');

    if (positions[position]) {
        resultText.textContent = "This position is already taken! Pick another one.";
    } else {
        positions[position] = true;
        localStorage.setItem('positions', JSON.stringify(positions));
        resultText.textContent = `You've successfully taken the position of ${position.replace('_', ' ')}!`;
    }
}

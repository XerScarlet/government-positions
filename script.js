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

// Add an issue to the specific branch's issues list
function addIssue(event, branch) {
    event.preventDefault();
    const issueInput = document.getElementById('issue');
    const newIssue = issueInput.value;

    let issues = JSON.parse(localStorage.getItem(branch + '_issues')) || [];
    issues.push(newIssue);
    localStorage.setItem(branch + '_issues', JSON.stringify(issues));

    issueInput.value = '';
    displayIssues(branch);
}

// Display the issues for a specific branch
function displayIssues(branch) {
    const issuesList = document.getElementById('issuesList');
    const issues = JSON.parse(localStorage.getItem(branch + '_issues')) || [];
    issuesList.innerHTML = '';

    issues.forEach(issue => {
        const listItem = document.createElement('li');
        listItem.textContent = issue;
        issuesList.appendChild(listItem);
    });
}

// Call displayIssues when the page loads, to populate the list of issues
document.addEventListener('DOMContentLoaded', () => {
    const branch = location.pathname.split('/').pop().split('.')[0]; // Get the branch name from the URL
    displayIssues(branch);
});

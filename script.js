// Reference to the Firebase database
const dbRef = firebase.database().ref();

// Add an issue to the Firebase database for a specific branch
function addIssue(event, branch) {
    event.preventDefault();
    const issueInput = document.getElementById('issue');
    const newIssue = issueInput.value;

    // Push the new issue to Firebase under the branch
    dbRef.child(branch + '_issues').push({
        issue: newIssue
    });

    issueInput.value = '';
    displayIssues(branch);
}

// Display the issues for a specific branch by retrieving data from Firebase
function displayIssues(branch) {
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    // Fetch issues from Firebase and display them
    dbRef.child(branch + '_issues').on('value', (snapshot) => {
        const issues = snapshot.val();
        issuesList.innerHTML = ''; // Clear the list before repopulating

        for (let id in issues) {
            const listItem = document.createElement('li');
            listItem.textContent = issues[id].issue;
            issuesList.appendChild(listItem);
        }
    });
}

// Call displayIssues when the page loads, to populate the list of issues
document.addEventListener('DOMContentLoaded', () => {
    const branch = location.pathname.split('/').pop().split('.')[0]; // Get the branch name from the URL
    displayIssues(branch);
});

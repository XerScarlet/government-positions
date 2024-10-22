 // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Add issue to Firebase
function addIssue(event, branch) {
  event.preventDefault();
  const issueInput = document.getElementById('issue');
  const newIssue = issueInput.value;

  // Push issue to the database under the specific branch (legislative, judicial, executive)
  database.ref(branch + '_issues').push({
    issue: newIssue
  });

  issueInput.value = '';
  displayIssues(branch);  // Refresh issue list
}

// Display issues from Firebase
function displayIssues(branch) {
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = ''; // Clear existing issues

  // Fetch issues from the Firebase database
  database.ref(branch + '_issues').on('value', (snapshot) => {
    const issues = snapshot.val();
    issuesList.innerHTML = '';  // Clear the issues list

    for (let id in issues) {
      const listItem = document.createElement('li');
      listItem.textContent = issues[id].issue;
      issuesList.appendChild(listItem);
    }
  });
}

// Display issues when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const branch = location.pathname.split('/').pop().split('.')[0];  // Determine branch based on URL
  displayIssues(branch);
});

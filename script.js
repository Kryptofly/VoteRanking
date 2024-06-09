document.getElementById('option-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addOption();
});

document.getElementById('generate-frame').addEventListener('click', function() {
    generateRankingFrame();
});

function addOption() {
    const optionInput = document.getElementById('option-input');
    const optionText = optionInput.value.trim();

    if (optionText) {
        const optionsList = document.getElementById('options-list');
        const li = document.createElement('li');
        li.textContent = optionText;

        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote';
        voteButton.addEventListener('click', function() {
            voteOption(li);
        });

        li.appendChild(voteButton);
        optionsList.appendChild(li);

        optionInput.value = '';
        document.getElementById('generate-frame').classList.remove('hidden');
    }
}

function voteOption(optionElement) {
    const votes = optionElement.getAttribute('data-votes') || 0;
    optionElement.setAttribute('data-votes', parseInt(votes) + 1);
}

function generateRankingFrame() {
    const optionsList = Array.from(document.getElementById('options-list').children);
    const rankedOptions = optionsList.sort((a, b) => {
        const votesA = parseInt(a.getAttribute('data-votes') || 0);
        const votesB = parseInt(b.getAttribute('data-votes') || 0);
        return votesB - votesA;
    });

    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    rankedOptions.forEach(option => {
        const li = document.createElement('li');
        li.textContent = `${option.textContent} - Votes: ${option.getAttribute('data-votes') || 0}`;
        rankingList.appendChild(li);
    });

    document.getElementById('ranking-container').classList.remove('hidden');

    // Here you can add the logic to post the generated ranking frame to Warpcast using their API
    // For example:
    // postToWarpcast(rankedOptions);
}

// Example function to post to Warpcast (dummy implementation)
function postToWarpcast(rankedOptions) {
    const postData = {
        rankedOptions: rankedOptions.map(option => ({
            text: option.textContent,
            votes: option.getAttribute('data-votes') || 0
        }))
    };

    fetch('https://warpcast-api-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

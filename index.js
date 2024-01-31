document.addEventListener('DOMContentLoaded', () => {
    const partyForm = document.getElementById('party-form');
    const partyList = document.getElementById('party-list');

    partyForm.addEventListener('submit', addParty);

    fetchParties();

    async function fetchParties() {
        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events');
            const parties = await response.json();
            renderParties(parties);
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    }

    async function addParty(event) {
        event.preventDefault();

        const formData = new FormData(partyForm);
        const partyData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(partyData),
            });

            if (!response.ok) {
                throw new Error('Failed to add party');
            }

            fetchParties();
        } catch (error) {
            console.error('Error adding party:', error);
        }
    }

    function renderParties(parties) {
        partyList.innerHTML = '';
        parties.forEach(party => {
            const partyItem = document.createElement('div');
            partyItem.classList.add('party-item');

            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteParty(party._id));

            partyItem.innerHTML = `<strong>Name: ${party.name}</strong><br>
                                   Date: ${party.date}, Time: ${party.time}<br>
                                   Location: ${party.location}<br>
                                   Description: ${party.description}`;
            partyItem.appendChild(deleteButton);

            partyList.appendChild(partyItem);
        });
    }

    async function deleteParty(partyId) {
        try {
            const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events/${partyId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete party');
            }

            fetchParties();
        } catch (error) {
            console.error('Error deleting party:', error);
        }
    }
});
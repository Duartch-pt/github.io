const API_URL = "https://tribalwars.works/api/world/zz1/player";

async function loadPlayers() {
    try {
        const response = await fetch(API_URL);
        const players = await response.json();

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        players.forEach(player => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${player.name}</td>
                <td>${player.loot_daily ?? "-"}</td>
                <td>${player.plundered_villages ?? "-"}</td>
                <td>${player.gathered ?? "-"}</td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
    }
}

loadPlayers();

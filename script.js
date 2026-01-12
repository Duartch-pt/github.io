const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/?endpoint=player.txt";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL);
        const text = await response.text();

        const lines = text.trim().split("\n");

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        lines.forEach(line => {
            const parts = line.split("|");
            const playerName = parts[1];

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${playerName}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
    }
}

loadPlayers();

const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const text = await response.text();

        const lines = text.trim().split("\n").filter(line => line);

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        lines.forEach(line => {
            const parts = line.split(","); // CSV separado por vírgula
            if (parts.length < 2) return;

            const playerName = parts[1]; // campo 1 = nome do jogador

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${playerName}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            `;
            tbody.appendChild(tr);
        });

        console.log(`Carregados ${lines.length} jogadores`);

    } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
    }
}

loadPlayers();

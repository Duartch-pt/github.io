const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const data = await response.json(); // JSON do Worker

        // Ordenar por pontos descrescente (ranking)
        data.sort((a, b) => parseInt(b.points) - parseInt(a.points));

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        data.forEach((player, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td> <!-- Rank -->
                <td>${player.name}</td>
                <td>${player.points}</td>
                <td>${player.villages}</td>
            `;
            tbody.appendChild(tr);
        });

        console.log(`Carregados ${data.length} jogadores`);

    } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
    }
}

loadPlayers();

// URL do proxy funcional
const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const players = await response.json();

        // Filtrar jogadores válidos
        const validPlayers = players.filter(p =>
            p.name && !isNaN(p.points) && !isNaN(p.villages)
        );

        // Ordenar por pontos descrescente
        validPlayers.sort((a, b) => b.points - a.points);

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        validPlayers.forEach((player, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.points}</td>
                <td>${player.villages}</td>
            `;
            tbody.appendChild(tr);
        });

        console.log(`Carregados ${validPlayers.length} jogadores`);

    } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
    }
}

loadPlayers();

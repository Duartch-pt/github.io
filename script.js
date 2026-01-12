const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const data = await response.json();

        // Filtrar apenas jogadores válidos com nome e pontos
        const validPlayers = data.filter(player =>
            player.name && player.points && player.villages
        );

        // Ordenar por pontos descrescente
        validPlayers.sort((a, b) => parseInt(b.points) - parseInt(a.points));

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

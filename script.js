const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const data = await response.json();

        // Filtrar apenas jogadores válidos
        const validPlayers = data
            .filter(player =>
                player &&
                typeof player.name === "string" &&
                player.name.trim().length > 0 &&
                !isNaN(parseInt(player.points)) &&
                !isNaN(parseInt(player.villages))
            )
            .map(player => ({
                name: player.name,
                points: parseInt(player.points),
                villages: parseInt(player.villages)
            }));

        // Ordenar por pontos descrescente
        validPlayers.sort((a, b) => b.points - a.points);

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        validPlayers.forEach((player, index) => {
            // Só adiciona jogadores válidos
            if (!player.name) return;

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

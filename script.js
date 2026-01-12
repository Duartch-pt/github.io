const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const text = await response.text(); // ler como texto

        // separar linhas
        const lines = text.trim().split("\n").filter(line => line && line.includes(","));

        // transformar CSV em objetos
        const players = lines.map(line => {
            const [id, name, points, villages] = line.split(",");
            return {
                id,
                name,
                points: parseInt(points) || 0,
                villages: parseInt(villages) || 0
            };
        });

        // ordenar por pontos descrescente
        players.sort((a, b) => b.points - a.points);

        // preencher a tabela
        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        players.forEach((player, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.points}</td>
                <td>${player.villages}</td>
            `;
            tbody.appendChild(tr);
        });

        console.log(`Carregados ${players.length} jogadores`);

    } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
    }
}

loadPlayers();

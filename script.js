const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL, { mode: 'cors' });
        const data = await response.json(); // agora JSON

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        data.forEach(player => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${player.name}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            `;
            tbody.appendChild(tr);
        });

        console.log(`Carregados ${data.length} jogadores`);

    } catch (err) {
        console.error("Erro ao carregar jogadores:", err);
    }
}

loadPlayers();

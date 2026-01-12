const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/?endpoint=player.txt";

async function loadPlayers() {
    try {
        const response = await fetch(WORKER_URL);
        const text = await response.text();

        // separar linhas e ignorar linhas vazias ou comentários
        const lines = text.trim().split("\n").filter(line => line && !line.startsWith("#"));

        const tbody = document.querySelector("#playersTable tbody");
        tbody.innerHTML = "";

        lines.forEach(line => {
            const parts = line.split("|");
            if (parts.length < 2) return; // ignora linhas inválidas

            const playerName = parts[1]; // o segundo campo é o nome

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

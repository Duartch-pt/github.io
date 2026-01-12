const WORKER_URL = "https://tribalwars.vascoduartemultimedia.workers.dev/?endpoint=player.txt";

async function loadPlayers() {
  try {
    const response = await fetch(WORKER_URL);
    const text = await response.text();

    // O ficheiro player.txt é separado por linhas
    // Cada linha: player_id|name|points|villages|ally_id
    const lines = text.trim().split("\n");

    const tbody = document.querySelector("#playersTable tbody");
    tbody.innerHTML = "";

    lines.forEach(line => {
      const parts = line.split("|");
      const playerName = parts[1];
      const lootVillages = "-"; // infelizmente player.txt não tem loot diário
      const plundered = "-"; // idem
      const gathered = "-"; // idem

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${playerName}</td>
        <td>${lootVillages}</td>
        <td>${plundered}</td>
        <td>${gathered}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro:", err);
  }
}

loadPlayers();

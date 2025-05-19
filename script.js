const apiKey = 'fb4c0568ab1c59276c47ec15672e639c'; // Reemplaza con tu clave API de API-Football

// Función para obtener clasificaciones
async function fetchStandings() {
  try {
    const response = await fetch('https://v3.football.api-sports.io/standings?league=39&season=2024', {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    });
    const data = await response.json();
    displayStandings(data.response[0].league.standings[0]);
  } catch (error) {
    console.error('Error al obtener las clasificaciones:', error);
  }
}

function displayStandings(standings) {
  const container = document.getElementById('standings-container');
  container.innerHTML = '';

  standings.forEach(team => {
    const row = document.createElement('div');
    row.className = 'standing-row';
    row.innerHTML = `
      <span>${team.rank}. ${team.team.name} - ${team.points} pts</span>
    `;
    container.appendChild(row);
  });
}

// Función para obtener próximos partidos
async function fetchFixtures() {
  try {
    const response = await fetch('https://v3.football.api-sports.io/fixtures?league=39&season=2024&next=10', {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    });
    const data = await response.json();
    displayFixtures(data.response);
  } catch (error) {
    console.error('Error al obtener los próximos partidos:', error);
  }
}

function displayFixtures(fixtures) {
  const container = document.getElementById('fixtures-container');
  container.innerHTML = '';

  fixtures.forEach(match => {
    const matchDiv = document.createElement('div');
    matchDiv.className = 'fixture';
    matchDiv.innerHTML = `
      <p>${match.teams.home.name} vs ${match.teams.away.name}</p>
      <p>Fecha: ${new Date(match.fixture.date).toLocaleDateString()}</p>
    `;
    container.appendChild(matchDiv);
  });
}

// Función para obtener máximos goleadores
async function fetchTopScorers() {
  try {
    const response = await fetch('https://v3.football.api-sports.io/players/topscorers?league=39&season=2024', {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    });
    const data = await response.json();
    displayTopScorers(data.response);
  } catch (error) {
    console.error('Error al obtener los máximos goleadores:', error);
  }
}

function displayTopScorers(players) {
  const container = document.getElementById('topscorers-container');
  container.innerHTML = '';

  players.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'topscorer';
    playerDiv.innerHTML = `
      <p>${player.player.name} - ${player.statistics[0].goals.total} goles</p>
    `;
    container.appendChild(playerDiv);
  });
}

// Inicializar funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  fetchLiveScores();
  fetchNews();
  fetchStandings();
  fetchFixtures();
  fetchTopScorers();
});

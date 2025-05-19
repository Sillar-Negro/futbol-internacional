const apiKey = 'fb4c0568ab1c59276c47ec15672e639c'; // Reemplaza con tu clave API de API-Football

// Función para obtener resultados en vivo
async function fetchLiveScores() {
  try {
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    });
    const data = await response.json();
    displayLiveScores(data.response);
  } catch (error) {
    console.error('Error al obtener resultados en vivo:', error);
  }
}

// Función para mostrar resultados en vivo
function displayLiveScores(matches) {
  const container = document.getElementById('scores-container');
  container.innerHTML = '';

  matches.forEach(match => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${match.teams.home.name} vs ${match.teams.away.name}</h3>
      <p>${match.goals.home} - ${match.goals.away}</p>
      <p>Minuto: ${match.fixture.status.elapsed}'</p>
    `;
    container.appendChild(card);
  });
}

// Función para obtener noticias (simulada)
function fetchNews() {
  const news = [
    {
      title: 'Transferencia sorpresa en la Premier League',
      content: 'Un jugador estrella ha sido transferido inesperadamente a un rival directo.'
    },
    {
      title: 'Resultados de la Champions League',
      content: 'Resumen de los partidos más destacados de la jornada.'
    },
    {
      title: 'Lesión de último minuto',
      content: 'Un jugador clave sufre una lesión durante el entrenamiento.'
    }
  ];

  const container = document.getElementById('news-container');
  container.innerHTML = '';

  news.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    `;
    container.appendChild(card);
  });
}

// Inicializar funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  fetchLiveScores();
  fetchNews();
});

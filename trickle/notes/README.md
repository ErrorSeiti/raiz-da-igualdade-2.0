# Raiz da Igualdade

Este projeto é uma recriação do portal de Direitos Humanos "Raiz da Igualdade" utilizando React e Tailwind CSS.

## Estrutura
- **Home**: Boas-vindas e Notícias.
- **Pilares**: Conteúdo educativo sobre Liberdade, Igualdade, Justiça e Dignidade.
- **Mapa Mental**: Visualização de conceitos.
- **Busca**: Localização de assistência jurídica utilizando OpenStreetMap.
- **Sobre**: Créditos da equipe.

## Notas Técnicas
- O tema utiliza uma paleta de cores baseada em **Roxo/Violeta** (HSL 270) para representar dignidade e justiça.
- **Mapa**: Migrado de Google Maps para OpenStreetMap (Leaflet) para remover dependência de chave de API proprietária.
- A API de notícias (NewsAPI) é chamada no frontend (com fallback para dados simulados em caso de erro CORS).
async function initMapaLoja() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const posicaoLoja = { lat: -8.9024349, lng: 13.3286111 }; // Estalagem, Viana, Luanda

  const map = new Map(document.getElementById("mapa-loja"), {
    center: posicaoLoja,
    zoom: 16,
    mapId: "MAPA_ESSENCIAS_AROMAS",
  });

  const marcador = new AdvancedMarkerElement({
    map,
    position: posicaoLoja,
    title: "Essências & Aromas",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="font-family: Inter, sans-serif; padding: 4px;">
        <strong>Essências & Aromas</strong><br>
        Rua do Império, Estalagem — Viana, Luanda<br>
        Su & Galeria<br>
        Aberto: 09h00 - 18h00
      </div>
    `,
  });

  marcador.addListener("gmp-click", () => {
    infoWindow.open(map, marcador);
  });
}

initMapaLoja();
let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 11,
    controls: [],
  });

  const coords = [
    [55.757349, 37.622441],
    [55.759132, 37.580903],
    [55.740644, 37.580732],
    [55.742605, 37.599911],
  ];

  const myCollection = new ymaps.GeoObjectCollection({},{
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: "./img/marker.svg",
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);
import { setDefaultOptions, loadModules } from "esri-loader";

export default function MiniMap(map, view) {
  loadModules([
    "esri/Graphic",
    "esri/core/watchUtils",
    "esri/views/MapView",
    "esri/Map",
  ]).then(([Graphic, WatchUtils, MapView, Map]) => {
    // Need to refactor the code
    const overviewMap = new Map({
      basemap: "topo-vector",
    });

    const miniMapView1 = new MapView({
      container: "multi-map1",
      map: map,
      zoom: 17,
      center: [103.33281039047418, 3.807395948058146],
      constraints: {
        rotationEnabled: false,
      },
    });

    const miniMapView2 = new MapView({
      container: "multi-map2",
      map: map,
      zoom: 16,
      center: [103.20450695143083, 3.7779032950610474],
      constraints: {
        rotationEnabled: false,
      },
    });

    const miniMapView3 = new MapView({
      container: "mini-map",
      map: map,
      zoom: 12,
      center: [103.24000560929687, 3.8082967288139757],
      constraints: {
        rotationEnabled: false,
      },
    });

    miniMapView3.when(() => {
      view.when(() => {
        setup();
      });
    });

    const setup = () => {
      const extent3Dgraphic = new Graphic({
        geometry: null,
        symbol: {
          type: "simple-fill",
          color: [0, 0, 0, 0.2],
          outline: {
            color: "yellow",
            width: 1,
          },
        },
      });
      miniMapView3.graphics.add(extent3Dgraphic);

      WatchUtils.init(view, "extent", (extent) => {
        view.graphics.removeAll();
        // Sync the overview map location
        // whenever the 3d view is stationary
        if (view.stationary) {
          miniMapView3
            .goTo({
              center: view.center,
              scale:
                view.scale *
                2 *
                Math.max(
                  view.width / miniMapView3.width,
                  view.height / miniMapView3.height
                ),
            })
            .catch((error) => {
              // ignore goto-interrupted errors
              if (error.name != "view:goto-interrupted") {
                console.error(error);
              }
            });
        }

        extent3Dgraphic.geometry = extent;
      });
    };
  }, []);
}

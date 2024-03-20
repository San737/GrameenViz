"use client";

import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import "./ShowBC.css";
import useSupercluster from "use-supercluster";
import { Marker, Popup, useMap } from "react-leaflet";
// import type { mapType } from "./map";
import type { BBox } from "geojson";
import * as BCData from "../../../data/BC_with_cord.json";

// import { IconType } from 'path/to/iconType'; // Replace 'path/to/iconType' with the actual path to the IconType type

// const icons = {};

const icons: Record<number, L.DivIcon> = {};

const fetchIcon = (count: number, size: number): L.DivIcon => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count]!;
};

function ShowBC() {
  const maxZoom = 22;
  const [bounds, setBounds] = useState<number[] | null>(null);
  const [zoom, setZoom] = useState<number>(12);
  const map = useMap();

  // get map bounds
  const updateMap = useCallback(() => {
    console.log("updating");
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }, [map]);

  const onMove = useCallback(() => {
    updateMap();
  }, [updateMap]);

  React.useEffect(() => {
    updateMap();
  }, [updateMap]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const points = BCData.map((e) => ({
    type: "Feature",
    properties: { cluster: false, BCId: e.SNo, State: e.State },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(e.Longitude?.toString() ?? "0"),
        parseFloat(e.Latitude?.toString() ?? "0"),
      ],
    },
  }));

  // ...

  const { clusters, supercluster } = useSupercluster({
    points: points as supercluster.PointFeature<{
      cluster: boolean;
      BCId: number;
    }>[],
    bounds: bounds as BBox | undefined,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  console.log(clusters.length);

  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties as {
            cluster: boolean;
            BCId: number;
            point_count: number;
          };

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude ?? 0, longitude ?? 0]}
              icon={
                fetchIcon(
                  pointCount,
                  10 + (pointCount / points.length) * 40,
                ) as L.Icon
              }
              eventHandlers={{
                click: () => {
                  if (supercluster && typeof cluster.id === "number") {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      maxZoom,
                    );
                    if (latitude !== undefined && longitude !== undefined) {
                      map.setView([latitude, longitude], expansionZoom, {
                        animate: true,
                      });
                    }
                  }
                },
              }}
            />
          );
        }

        // we have a single point (crime) to render
        return (
          <Marker
            key={cluster.properties.BCId as number}
            position={[latitude ?? 0, longitude ?? 0]}
          >
            <Popup>
              {
                (
                  cluster.properties as {
                    cluster: boolean;
                    BCId: number;
                    State: string;
                  }
                ).State
              }
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default ShowBC;

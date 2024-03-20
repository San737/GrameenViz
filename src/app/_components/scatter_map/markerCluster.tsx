"use client";

import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import "./ShowBC.css";
import useSupercluster from "use-supercluster";
import { Marker, Popup, useMap } from "react-leaflet";
import type { mapType } from "./map";
import type { BBox } from "geojson";
import * as BCData from "../../../data/BC_with_cord.json";
import { useQuery } from "~/app/_context/queryHook";

// import { IconType } from 'path/to/iconType'; // Replace 'path/to/iconType' with the actual path to the IconType type

// const icons = {};

type PointType = {
  cluster: boolean;
  BCId: number;
  State: string;
  NameOfBC: string;
  BankName: string;
  District: string;
  Pincode: number;
  CorporateBCName: string;
  OfficeName: string;
  ContactNumber: number;
};

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
  const { query } = useQuery();
  const [filteredData, setFilteredData] = useState<mapType[]>();

  useEffect(() => {
    let filtered: any = [];

    if (query.key === "BankName") {
      filtered = BCData.filter((item) => item.BankName.includes(query.value));
    } else if (query.key === "Pincode") {
      filtered = BCData.filter((item) =>
        item.Pincode.toString().includes(query.value),
      );
    } else if (query.key === "State&District") {
      const [state, district] = query.value.split("&");
      filtered = BCData.filter(
        (item) => item.State === state && item.District === district,
      );
    }

    setFilteredData(filtered);
  }, [query]);

  console.log(filteredData);

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

  const points = (filteredData ?? []).map((e) => ({
    type: "Feature",
    properties: {
      cluster: false,
      BCId: e.SNo,
      State: e.State,
      NameOfBC: e.NameOfBC,
      BankName: e.BankName,
      District: e.District,
      Pincode: e.Pincode,
      CorporateBCName: e.CorporateBCName,
      OfficeName: e.OfficeName,
      ContactNumber: e.ContactNumber,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(e.Longitude?.toString() ?? "0"),
        parseFloat(e.Latitude?.toString() ?? "0"),
      ],
    },
  }));

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
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties as {
            cluster: boolean;
            BCId: number;
            point_count: number;
          };

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

        return (
          <Marker
            key={cluster.properties.BCId as number}
            position={[latitude ?? 0, longitude ?? 0]}
          >
            <Popup>
              Name of BC:- {(cluster.properties as PointType).NameOfBC}
              <br />
              Contact Number:- {(cluster.properties as PointType).ContactNumber}
              <br />
              Bank Name:- {(cluster.properties as PointType).BankName}
              <br />
              Office Name:- {(cluster.properties as PointType).OfficeName}
              <br />
              Corporate BC Name:-{" "}
              {(cluster.properties as PointType).CorporateBCName}
              <br />
              Pincode:- {(cluster.properties as PointType).Pincode}
              <br />
              State:- {(cluster.properties as PointType).State} <br />
              District:- {(cluster.properties as PointType).District}
              <br />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default ShowBC;

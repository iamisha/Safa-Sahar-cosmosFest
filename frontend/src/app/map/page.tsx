"use client"

import React, { useState, useEffect } from 'react';
import L, { Layer, Map as map} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import userIconUrl from './user.png';
import driverIconUrl from './truck-solid.svg';
import dustbinIconUrl from './trash-solid.svg';

interface UserData {
  role: string;
  latitude: number;
  longitude: number;
  email?: string;
}

let Map = () => {
  let [user, setUser] = useState<UserData | null>(null);
  let [usersData, setUsersData] = useState<UserData[]>([]);
  let [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const map = L.map('map');
    map.on('click', (e) => {
      const popupContent = `
      <div class="w-full max-w-md">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-lg font-bold mb-2" for="longitude">
            Longitude
          </label>
          <input class="shadow text-lg text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="longitude" type="text" value=${e.latlng.lng}>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-bold mb-2" for="latitude">
            Latitude
          </label>
          <input class="shadow text-white text-lg appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="text" value=${e.latlng.lat}>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        </div>
      </form>
    </div>
      `;

      L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
    })
    map.setView([27.67142, 85.3318410], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let userMarker: Layer | undefined, dustbinMarker: Layer | undefined, circle: L.Circle | undefined;
    let driverMarker: Layer | undefined;
    // let zoomed: Map | undefined;
    let user1: UserData = {
      role: "citizen",
      latitude: 123.04,
      longitude: 345.67
    };

    let distance: number;

    async function fetchData() {
      try {
        let userData = await axios.get("http://localhost:5000/userDetail", {
          withCredentials: true
        });

        setUser(userData.data.result);
        user1 = userData.data.result;
        console.log(user1);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();

    async function _sendEmail(userEmail: { email: string }) {
      try {
        let msg = await axios.post('http://localhost:5000/sendEmailtoUser', userEmail, { withCredentials: true });
        console.log(msg);
        console.log('sent email');
      } catch (error) {
        console.log(error);
      }
    }

    async function getUsersDetails() {
      try {
        let listOfUsers = await axios.get('http://localhost:5000/allusers');
        setUsersData(listOfUsers.data.result);
        console.log(listOfUsers);
      } catch (error) {
        console.error("Error Fetching all data:", error);
      }
    }

    getUsersDetails();

    function success(pos: GeolocationPosition) {
      let accuracy = pos.coords.accuracy;
      let driver_lat = 27.67142;
      let driver_lng = 85.33980;
      let dustbin_lat = 27.6700;
      let dustbin_lng = 85.33950;
      let user_lat = user1.latitude;
      let user_lng = user1.longitude;

      let driver_latlng: L.LatLng;
      let user_latlng: L.LatLng;

      let driverIcon = L.icon({
        iconUrl: driverIconUrl,
        iconSize: [25, 25],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });

      let dustbinIcon = L.icon({
        iconUrl: dustbinIconUrl,
        iconSize: [25, 25],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });

      if (user1 !== null) {
        if (user1.role === 'Citizen') {
          console.log('citizen');
          user_lat = user1.latitude;
          user_lng = user1.longitude;

          if (user_lat !== undefined && user_lng !== undefined) {
            if (userMarker) {
              map.removeLayer(userMarker);
            //   map.removeLayer(circle);
            }

            map.whenReady(function () {
              dustbinMarker = L.marker([dustbin_lat, dustbin_lng], { icon: dustbinIcon });
              driverMarker = L.marker([driver_lat, driver_lng], { icon: driverIcon });
            //   userMarker = L.marker([user_lat, user_lng], { icon: L.icon({ iconUrl: userIconUrl, iconSize: [38, 38], iconAnchor: [19, 38] }) });

            //   userMarker.addTo(map);
              driverMarker.addTo(map);
              dustbinMarker.addTo(map);
              circle = L.circle([user_lat, user_lng], { radius: accuracy }).addTo(map);

            //   if (!zoomed) {
            //     zoomed = map.fitBounds(circle.getBounds());
            //   }
            });
          }
          map.setView([user_lat, user_lng]);
        }

        if (user1.role === "Driver") {
          console.log('driver');
          driver_lat = pos.coords.latitude;
          driver_lng = pos.coords.longitude;

          if (driver_lat !== undefined && driver_lng !== undefined) {
            if (driverMarker) {
              map.removeLayer(driverMarker);
            //   map.removeLayer(circle);
            }

            map.whenReady(function () {
              dustbinMarker = L.marker([dustbin_lat, dustbin_lng], { icon: dustbinIcon });
              driverMarker = L.marker([driver_lat, driver_lng], { icon: driverIcon });

              driverMarker.addTo(map);
              dustbinMarker.addTo(map);
              circle = L.circle([driver_lat, driver_lng], { radius: accuracy }).addTo(map);

            //   if (!zoomed) {
            //     zoomed = map.fitBounds(circle.getBounds());
            //   }

              map.setView([driver_lat, driver_lng]);
            });

            driver_latlng = L.latLng(driver_lat, driver_lng);
            console.log(driver_latlng);

            var _userEmail = 'adhikariyubraj894@gmail.com';

            let emailData = {
              email: _userEmail,
            };
            _sendEmail(emailData);

            if (user1 !== null) {
              const userRoleData = {
                latitude: 123.90,
                longitude: 123.90,
                email: "abhilekh.191304@ncit.edu.np"
              };

              if (userRoleData !== undefined) {
                user_lat = userRoleData.latitude;
                user_lng = userRoleData.longitude;
                var _userEmail = userRoleData.email;

                let emailData = {
                  email: _userEmail,
                };

                user_latlng = L.latLng(user_lat, user_lng);
                console.log(user_latlng);
                distance = driver_latlng.distanceTo(user_latlng);

                console.log(distance);

                if (distance < 500) {
                  _sendEmail(emailData);
                }
              }
            }
          }
        }
      }
    }

    function error(err: GeolocationPositionError) {
      if (err.code === 1) {
        alert('Please provide geolocation access!');
      } else {
        alert('Cannot get current location');
      }
    }

    navigator.geolocation.watchPosition(success, error);

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Map User Location</h1>
      <div id="map" style={{ height: '850px', position: 'relative' }}>
      </div>
    </div>
  );
};

export default Map;

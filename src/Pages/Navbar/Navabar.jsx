import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { IoLocationOutline } from "react-icons/io5";
import axios from 'axios';

export default function Navbar() {
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');

  const uzbLocations = {
    "Andijon": ["Andijon shahar", "Asaka", "Baliqchi", "Shahrixon"],
    "Buxoro": ["Buxoro shahar", "Vobkent", "G‘ijduvon", "Romitan"],
    "Fargona": ["Fargʻona shahar", "Qoʻqon", "Margʻilon", "Rishton"],
    "Jizzax": ["Jizzax shahar", "Zomin", "G‘allaorol", "Sharof Rashidov"],
    "Xorazm": ["Urganch", "Xiva", "Hazorasp", "Yangibozor"],
    "Namangan": ["Namangan shahar", "Chust", "To‘raqo‘rg‘on", "Pop"],
    "Navoiy": ["Navoiy shahar", "Karmana", "Qiziltepa", "Zarafshon"],
    "Qashqadaryo": ["Qarshi", "Shahrisabz", "Kasbi", "Kitob"],
    "Qoraqalpogiston Respublikasi": ["Nukus", "Beruniy", "Chimboy", "Mo‘ynoq"],
    "Samarqand": ["Samarqand", "Urgut", "Ishtixon", "Kattaqo‘rg‘on"],
    "Sirdaryo": ["Guliston", "Boyovut", "Sardoba", "Shirin"],
    "Surxondaryo": ["Termiz", "Sherobod", "Denov", "Boysun"],
    "Toshkent": ["Chirchiq", "Olmaliq", "Bekobod", "Yangiyo‘l"],
    "Toshkent shahri": ["Yunusobod", "Chilonzor", "Mirzo Ulug‘bek", "Sergeli"]
  };
  useEffect(() => {
    const detectLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Coords:', latitude, longitude);

            try {
              const res = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );
              const address = res.data.address;
              console.log('Address:', address);

              // Try to find region
              const foundRegion = Object.keys(uzbLocations).find(region =>
                Object.values(address).some(val =>
                  val?.toLowerCase().includes(region.toLowerCase())
                )
              );

              // Try to find district inside found region
              const foundDistrict = foundRegion
                ? uzbLocations[foundRegion].find(dist =>
                    Object.values(address).some(val =>
                      val?.toLowerCase().includes(dist.toLowerCase())
                    )
                  )
                : '';

              if (foundRegion) {
                setRegion(foundRegion);
                console.log('Detected region:', foundRegion);
              }
              if (foundDistrict) {
                setDistrict(foundDistrict);
                console.log('Detected district:', foundDistrict);
              }

            } catch (err) {
              console.error("Error fetching address:", err);
            }
          },
          (err) => {
            console.error("Geolocation error:", err);
          }
        );
      } else {
        console.error("Geolocation not supported");
      }
    };

    detectLocation();
  }, []);
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setDistrict('');
  };
  useEffect(() => {
    if (region && district) {
      const locationData = { region, district };
      localStorage.setItem("userLocation", JSON.stringify(locationData));
    }
  }, [region, district]);
  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      const { region, district } = JSON.parse(saved);
      setRegion(region);
      setDistrict(district);
    }
  }, []);
  <button onClick={() => {
    setRegion('');
    setDistrict('');
    localStorage.removeItem("userLocation");
  }}>
    Joylashuvni o'zgartirish
  </button>
  
  return (
    <div className='navbar'>
      <div className='navbar-display'>
        <div className='navbar-icon'><IoLocationOutline /></div>
        <div className='navbar-location'>
          <select value={region} onChange={handleRegionChange}>
            <option value="" disabled>Viloyatni tanlang</option>
            {Object.keys(uzbLocations).map((reg) => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>

          {region && (
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="" disabled>Tuman tanlang</option>
              {uzbLocations[region].map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

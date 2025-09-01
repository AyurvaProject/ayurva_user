import axios from "axios";

export async function GetRoadDistance(lat1, lon1, lat2, lon2) {
  const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJhMTQyYzE3YzYxMjRhMDY4MWYyZmM3NjA5MTI5MzczIiwiaCI6Im11cm11cjY0In0=";
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lon1},${lat1}&end=${lon2},${lat2}`;

  try {
    const response = await axios.get(url);
    const distanceInMeters = response.data.features[0].properties.segments[0].distance;
    return (distanceInMeters / 1000).toFixed(2); // Return in KM
  } catch (error) {
    console.error("Error fetching road distance:", error);
    return null;
  }
}
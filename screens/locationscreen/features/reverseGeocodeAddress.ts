export async function reverseGeocodeAddress({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) {
  try {
    console.log(latitude, longitude);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDy7zLF31fjoMtFTrkJP9O32oKdqP6npRs`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0].formatted_address);
    return data.results[0].formatted_address;
  } catch (error) {
    console.error(error);
  }
}

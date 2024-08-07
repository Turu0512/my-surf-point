export const fetchTideData = async (year:number, month:number, day:number) => {
  const url = `https://api.tide736.net/get_tide.php?pc=45&hc=2&yr=${year}&mn=${month}&dy=${day}&rg=week`;
  const response = await fetch(url);
  console.log(response);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  console.log(response.json());
  return response.json();
};
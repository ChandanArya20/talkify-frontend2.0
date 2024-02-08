const statusData = Array.from({ length: 20 }, (_, index) => ({
    id:index,
    statusImages: 'https://cdn.pixabay.com/photo/2016/03/27/21/52/woman-1284411_1280.jpg',
    userName: `User ${index + 1}`,
    statusTimeStamp: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)}`,
  }));

  export default statusData;
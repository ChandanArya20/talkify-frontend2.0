const chatUserData = Array.from({ length: 20 }, (_, index) => ({
    id:index,
    statusImages: 'https://cdn.pixabay.com/photo/2016/03/27/21/52/woman-1284411_1280.jpg',
    userName: `User ${index + 1}`,
    about: `my about section`,
  }));

  export default chatUserData;
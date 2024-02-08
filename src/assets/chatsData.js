const chatsData = Array.from({ length: 25 }, (_, index) => ({
    id:index,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/21/52/woman-1284411_1280.jpg',
    userName: `User ${index + 1}`,
    lastMessage: `Message ${index + 1}`,
    timeStamp: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)}`,
    messageCount: Math.floor(Math.random() * 20),
  }));

  export default chatsData;
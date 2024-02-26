import DefaultUser from '../assets/default-user.png'

const statusData = Array.from({ length: 20 }, (_, index) => ({
    id:index,
    statusImages: DefaultUser,
    userName: `User ${index + 1}`,
    statusTimeStamp: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)}`,
  }));

  export default statusData;
import faker from 'faker';

faker.seed(Math.random());

let lastId = 1000;

export function generateId() {
  lastId += 1;
  return lastId;
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let temp = array[i];

    array[i] = array[r];
    array[r] = temp;
  }

  return array;
}

const HeaderImages = [
  { uri: 'https://picsum.photos/id/112/900/600' },
  { uri: 'https://picsum.photos/id/1041/900/600' },
  { uri: 'https://picsum.photos/id/167/900/600' },
  { uri: 'https://picsum.photos/id/487/900/600' },
  { uri: 'https://picsum.photos/id/106/900/600' },
];

interface UserType {
  id: number;
  name: string;
  email: string;
  image: string;
}

const Users: UserType[] = [];

for (let i = 1; i < 30; i += 1) {
  Users.push({
    id: generateId(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
  });
}

export { HeaderImages, Users };

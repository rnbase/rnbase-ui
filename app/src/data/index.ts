import faker from 'faker';

faker.seed(Math.random());

let lastId = 1000;

export function generateId() {
  return ++lastId;
}

const allHeaderImages = [
  { uri: 'https://picsum.photos/id/112/900/600' },
  { uri: 'https://picsum.photos/id/1041/900/600' },
  { uri: 'https://picsum.photos/id/167/900/600' },
  { uri: 'https://picsum.photos/id/487/900/600' },
  { uri: 'https://picsum.photos/id/106/900/600' },
];

export const generateHeaderImages = (limit: number) => {
  const headerImages = faker.helpers.shuffle(allHeaderImages);

  return limit > 0 ? headerImages.slice(0, limit) : headerImages;
};

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

export const generateUser = (props?: Partial<User>): User => ({
  id: generateId(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  image: faker.image.avatar(),
  ...props,
});

export const generateUsers = (limit: number): User[] =>
  Array(limit)
    .fill(undefined)
    .map(() => generateUser());

export default {
  users: generateUsers(30),
  headerImages: allHeaderImages,
};

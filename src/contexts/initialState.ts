import randomName from 'random-name';
import randomMobile from 'random-mobile';
import { v4 as id } from 'uuid';
import { PersonWithId } from 'interfaces/Person';

const generateParticipants = (): PersonWithId[] => {
  let participants = new Array(20).fill(undefined).map(() => {
    const name = `${randomName.first()} ${randomName.last()}`;

    return {
      id: id(),
      name,
      email: `${name}@example.com`.toLocaleLowerCase().replace(' ', '.'),
      phone: randomMobile(),
    };
  });

  return participants;
};

export const initialState = generateParticipants();

import React from 'react';
import { v4 as id } from 'uuid';
import { Person, PersonWithId } from 'interfaces/Person';
import { initialState } from './initialState';

type ParticipantState = PersonWithId[];

type AddParticipantAction = {
  type: 'ADD_PARTICIPANT';
  payload: PersonWithId;
};

type RemoveParticipantAction = {
  type: 'REMOVE_PARTICIPANT';
  payload: Pick<PersonWithId, 'id'>;
};

type EditParticipantAction = {
  type: 'EDIT_PARTICIPANT';
  payload: PersonWithId;
};

type Action = AddParticipantAction | RemoveParticipantAction | EditParticipantAction;

interface ParticipantContextType {
  state: ParticipantState;
  dispatch: React.Dispatch<Action>;
}

const ParticipantContext = React.createContext<ParticipantContextType | undefined>(undefined);

const participantReducer = (state: ParticipantState, action: Action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return [action.payload, ...state];
    case 'REMOVE_PARTICIPANT':
      return state.filter((item) => item.id !== action.payload.id);
    case 'EDIT_PARTICIPANT':
      return state.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    default:
      throw new Error(`Action is not supported: ${(action as any).type}`);
  }
};

export const ParticipantProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<React.Reducer<ParticipantState, Action>>(participantReducer, initialState);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return <ParticipantContext.Provider value={value}>{children}</ParticipantContext.Provider>;
};

export const useParticipantContext = () => {
  const context = React.useContext(ParticipantContext);

  if (!context) {
    throw new Error('useParticipantContext must be used inside ParticipantProvider');
  }
  const { state, dispatch } = context;

  const addParticipant = (participant: Person) => {
    dispatch({ type: 'ADD_PARTICIPANT', payload: { id: id(), ...participant } });
  };

  const removeParticipant = (id: string) => {
    dispatch({ type: 'REMOVE_PARTICIPANT', payload: { id } });
  };

  const editParticipant = (participant: PersonWithId) => {
    dispatch({ type: 'EDIT_PARTICIPANT', payload: participant });
  };

  return {
    participants: state,
    addParticipant,
    removeParticipant,
    editParticipant,
  };
};

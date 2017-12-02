
import { ADD_NOTE, ADD_NOTES, DELETE_NOTE, UPVOTE, DOWNVOTE } from './NoteActions';
const dummyNotes = [{
  title: 'String',
  content: 'Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.',
  owner: 'Tinu Tomson',
  isPrivate: true,
  isEditable: true,
  LastModified: 1481544700,
  cuid: 12345,
  meta: {
    tags: [100, 101, 102],
    fav: [1001, 1002, 1003, 1004],
    upvote: [1001, 1002, 1003, 1004],
    downvote: [],
  },
}, {
  title: 'Second String',
  content: 'Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.',
  owner: 'Sravan Samudra',
  cuid: 12346,
  isPrivate: true,
  isEditable: true,
  LastModified: 1481544732,
  meta: {
    tags: [100, 101, 102],
    fav: [1001, 1002, 1003, 1004],
    upvote: [1001, 1002, 1003, 1004],
    downvote: [],
  },
}];

const initialState = { notes: [] };

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE :
      return {
        notes: [action.note, ...state.notes],
      };

    case ADD_NOTES :
      const notes  = action.payload.map(note => {
        note._source.id = note._id;
        return note._source;
      })
      return {
        notes,
      };

    case DELETE_NOTE :
      return {
        notes: state.notes.filter(note => note.cuid !== action.cuid),
      };

    case UPVOTE:
      return {
        notes: state.notes.map((note) => {
          console.log("From inside note reducer UPVOTE - " + action.payload)
          const { noteId, username } = action.payload
          if(note.id === noteId) {
            // Use below commented code to implement click toggle (upvote when clicked first time, downvote when clicked again)
            // let upvotes = note.
            // if note.meta.upvotes.contains(username) {
            
            // }
            return {
              ...note,
              meta: {
                ...note.meta,
                upvotes: [...note.meta.upvotes, username]
              }
            }
          }
          return note;
        })
      }

    case DOWNVOTE:
      return {
        notes: state.notes.map((note) => {
          console.log("From inside note reducer DOWNVOTE - " + action.payload)
          const { noteId, username } = action.payload
          if(note.id === noteId) {
            return {
              ...note,
              meta: {
                ...note.meta,
                downvotes: [...note.meta.downvotes, username]
              }
            }
          }
          return note;
        })
      }

    default:
      return state;
  }
};

/* Selectors */

// Get all notes
export const getNotes = state => state.notebook.notes;

// Get note by cuid
export const getNote = (state, cuid) => state.notebook.notes.filter(note => note.cuid === cuid)[0];

// Export Reducer
export default NoteReducer;

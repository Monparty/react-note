import { useState } from 'react'
import './App.css'

const startNote = {
    content: '',
    author: ''
}

function App() {
    // states
    const [note, setNote] = useState(startNote);
    const [allNote, setAllNotes] = useState([]);

    // functions
    function onNoteValueChange(e) {
        const { name, value} = e.target
        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            }
        });

    }
    
    function onNoteSubmit(e) {
        e.preventDefault();
        
        setAllNotes((prevAllNotes) => {
            const newNote = {
                ...note
            };
            newNote.id = Date.now().toString();
            return [
                newNote, ...prevAllNotes 
            ];
        });
        setNote(startNote);
    }

    function onNoteDelete(noteId) {
        setAllNotes((prevAllNotes) => {
            return prevAllNotes.filter(theNote => theNote.id !== noteId);
        });
    }
    
    function onNoteEdit() {

    }

    // Elements
    const noteElements = allNote.map((theNote) => {
        return (
            <div key={theNote.id} className='app__note'>
                <div>{theNote.content}</div>
                <div>{theNote.author}</div>
                <div className='btn__group'>
                    <button className='btn btn__edit' onClick={onNoteEdit}>แก้ไข</button>
                    <button className='btn btn__delete' onClick={() => {onNoteDelete(theNote.id)}}>ลบ</button>
                </div>
            </div>
        );
    });

    return (
        <section className='app__section'>
            <form className='app__form' onSubmit={onNoteSubmit}>
                <h3>ซอยจุ๊</h3>
                <div>
                    <textarea name='content' placeholder='ซอยจุ๊'  value={note.content} onChange={onNoteValueChange} />
                </div>
                <div>
                    <input type="text" name='author' autoComplete='off' placeholder='คนซอยจุ๊' value={note.author} onChange={onNoteValueChange} />
                </div>
                <div>
                    <button type='submit' className='btn__submit'>บันทึก</button>
                </div>
            </form>
            <div className='note__container'>
                {noteElements}
            </div>
        </section>
    )
}

export default App

import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Chargement des notes depuis le localStorage lors du montage du composant
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleSave = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    // Sauvegarde dans le localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setIsAddingNote(false); // Ferme le formulaire après avoir sauvegardé la note
  };

  const handleAddNote = () => {
    setIsAddingNote(true); // Ouvre le formulaire pour ajouter une note
  };


  const handleEdit = (editedNote) => {
    // Logique de modification de la note
  };

  const handleDelete = (deletedNote) => {
    // Logique de suppression de la note
  };

  return (
    <div>
      <h1>Bloc-notes</h1>
      <button onClick={handleAddNote}>Ajouter une note</button>
      {isAddingNote && (
        <div>
          <MarkdownInput onSave={handleSave} />
        </div>
      )}
      {notes.map((note, index) => (
        <NoteDisplay
          key={index}
          note={note}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;

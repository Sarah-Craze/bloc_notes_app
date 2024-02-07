import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';

function App() {
  const [notes, setNotes] = useState([]);
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
    // Copier le tableau des notes
    const updatedNotes = [...notes];
    // Trouver l'index de la note modifiée
    const index = updatedNotes.findIndex(note => note.name === editedNote.name);
    // Remplacer la note modifiée par la nouvelle version
    updatedNotes[index] = editedNote;
    // Mettre à jour l'état des notes
    setNotes(updatedNotes);
    // Mettre à jour le localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleDelete = (deletedNote) => {
    // Filtrer les notes pour exclure celle à supprimer
    const updatedNotes = notes.filter(note => note.name !== deletedNote.name);
    // Mettre à jour l'état des notes
    setNotes(updatedNotes);
    // Mettre à jour le localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
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
          onEdit={handleEdit} // Passer la fonction handleEdit à NoteDisplay
          onDelete={handleDelete} // Passer la fonction handleDelete à NoteDisplay
        />
      ))}
    </div>
  );
}

export default App;

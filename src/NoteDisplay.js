import React, { useState } from 'react';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

function NoteDisplay({ note, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const htmlContent = converter.makeHtml(note.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(note.content); // Remet le contenu initial
  };

  const handleSaveEdit = () => {
    // Appelle la fonction de mise à jour avec la note modifiée
    onEdit({ ...note, content: editedContent });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(note);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  return (
    <div>
      <h3>{note.name}</h3>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={handleContentChange}
            rows="10"
            cols="50"
          />
          <button onClick={handleSaveEdit}>Enregistrer</button>
          <button onClick={handleCancelEdit}>Annuler</button>
        </div>
      ) : (
        <div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <button onClick={handleEditClick}>Modifier</button>
          <button onClick={handleDeleteClick}>Supprimer</button>
        </div>
      )}
    </div>
  );
}

export default NoteDisplay;

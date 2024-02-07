import React, { useState } from 'react';

function MarkdownInput({ onSave }) {
  const [noteName, setNoteName] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  const handleNameChange = (event) => {
    setNoteName(event.target.value);
  };

  const handleMarkdownChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  const handleSave = () => {
    onSave({ name: noteName, content: markdownContent });
    // Nettoie les champs après la sauvegarde
    setNoteName('');
    setMarkdownContent('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nom de la note"
        value={noteName}
        onChange={handleNameChange}
      />
      <textarea
        value={markdownContent}
        onChange={handleMarkdownChange}
        placeholder="Contenu de la note en Markdown"
        rows="10"
        cols="50"
      />
      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
}

export default MarkdownInput;

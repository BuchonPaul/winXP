import "./SaveModal.css";

export function SaveModal({
  title,
  setTitle,
  showSave,
  setShowSave,
  saveChanges,
}) {
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const hideWindow = () => {
    setShowSave(false);
  };

  return (
    <div
      className="saveModalContainer windowContainer"
      style={{ display: showSave ? "flex" : "none" }}
    >
      <div className="windowHeader"></div>
      <header className="windowHeaderContent">
        <div className="windowTools">
          <button className="windowQuit" onClick={hideWindow}></button>
        </div>
      </header>
      <div className="modTop">
        <input type="text" value={title} onChange={onTitleChange} />
      </div>
      <div className="modBottom">
        <button onClick={hideWindow}>Annuler</button>
        <button onClick={saveChanges}>Enregister</button>
      </div>
    </div>
  );
}

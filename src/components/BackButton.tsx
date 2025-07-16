export default function BackButton() {
  return (
    <div className="back-button-container">
      <div className="back-button" onClick={() => window.history.back()}>
        Atrás
      </div>
    </div>
  );
}

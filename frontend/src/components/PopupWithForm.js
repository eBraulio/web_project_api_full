export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup__opened" : ""
      }`}
    >
      <div className="popup__overlay" id="popup-overlay-edit"></div>
      <div
        className={`popup__overlay ${
          props.isOpen ? "popup__overlay-opened" : ""
        }`}
        id="popup-overlay-edit"
      ></div>
      <div className="popup__container" id="edit-popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          className={`popup__edit popup__${props.name}`}
          name={props.name}
          //noValidate
        >
          {props.children}
          <button
            className="popup__save-button popup__button"
            id="btn-submit-profile"
            type="submit"
          >
            {props.buttonText}
          </button>
          <button
            className="popup__close-button popup__close-form"
            id="btn-close-profile"
            type="button"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

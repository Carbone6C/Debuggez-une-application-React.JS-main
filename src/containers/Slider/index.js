import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  /* Ajout de l'opérateur logique pour retourner un tableau vide si data ou data.focus est null */
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];
  const nextCard = () => {
    setTimeout(() => {
      /* Utilisation de la fonction setIndex pour permettre 
      d'ajouter prevIndex et ajout du -1 */
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
  };
  useEffect(() => {
    nextCard();
  }, []); /* Ajout de [] pour l'executer après le rendu du composant */

  /* Ajout de la fonction pour update le state */
  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {/* Remplacement des <> </> par une <div></div> */}
      {byDateDesc?.map((event, idx) => (
        <div key={event.date}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                  <input
                    /* Changement de la key pour la rendre unique */
                    key={`${_.date}`}
                    type="radio"
                    name="radio-button"
                    /* Remplacement de idx par index */
                    checked={index === radioIdx}
                    /* Appel de la fonction au changement */
                    onChange={() => handleRadioChange(radioIdx)}
                  />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

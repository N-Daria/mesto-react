import { findRenderedComponentWithType } from "react-dom/test-utils"
import { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [userName, changeName] = useState('');
  const [userDescription, changeDescription] = useState();
  const [userAvatar, changeNameAvatar] = useState();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get('users/me')
      .then(data => {
        changeName(data.name);
        changeDescription(data.about);
        changeNameAvatar(data.avatar);
      })
  }, [userName, userDescription, userAvatar])

  useEffect(() => {
    api.get('cards').then((data) => {
      setCards(
        data.map((item) => ({
          src: item.link,
          title: item.name,
          key: item._id,
          likes: item.likes.length,
        }))
      )
    })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Фотография профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__header">{userName}</h1>
          <button className="profile__edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить новую фотографию" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__gallery list">

          {cards.map((card) => <Card {...card} onCardClick={onCardClick} />)}

        </ul>
      </section>
    </main >
  )

}

export default Main

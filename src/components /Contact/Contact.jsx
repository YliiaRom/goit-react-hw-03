import css from "./Contact.module.css";
import { BiSolidUser } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
export default function Contact({ user: { id, name, number }, onDelete }) {
  return (
    <div className={css.card} id={id}>
      <div>
        <div className={css.boxName}>
          <BiSolidUser className={css.iconUser} />
          <p className={css.title}>{name}</p>
        </div>
        <div className={css.boxName}>
          <BiPhone className={css.iconUser} />
          <p>{number}</p>
        </div>
      </div>

      <button className={css.button} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}

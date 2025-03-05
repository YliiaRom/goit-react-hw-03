import * as Yup from "yup";
// import { ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
export default function ContactForm({ onAdd }) {
  //  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  const idName = nanoid();
  const idNumber = nanoid();
  const idCard = nanoid();
  const initialValues = {
    id: idCard,
    name: "",
    number: "",
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   onAdd({
  //     id: Date.now(),
  //     name: event.target.elements.name.value,
  //     number: event.target.elements.number.value,
  //   });

  //   event.target.reset();
  // };
  const newValidateWidthYupCard = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Обов`язково до заповнення"),
    number: Yup.string()
      .matches(/^\d+$/, "Тільки цифри!")
      .required("Обов`язково до заповнення"),
  });
  const handleSubmitFormik = (values, actions) => {
    // event.preventDefault();
    // console.log(values);
    // onAdd({ ...values, id: idCard });
    onAdd(values);
    // console.log(values);
    actions.resetForm();
  };
  return (
    <>
      <h2>Форма додавання контактів</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={newValidateWidthYupCard}
        onSubmit={handleSubmitFormik}
      >
        <Form className={css.formik}>
          <label htmlFor={idName}>Name</label>
          <Field className={css.input} type="text" id={idName} name="name" />
          <ErrorMessage className={css.error} name="name" component="span" />
          <label htmlFor={idNumber}>Number</label>
          <Field
            className={css.input}
            type="text"
            id={idNumber}
            name="number"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
      {/* 
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor={idName}>Name</label>
        <input type="text" id={idName} name="name" />
        <label htmlFor={idNumber}>Number</label>
        <input type="text" id={idNumber} name="number" />
        <button type="submit">Add contact</button>
      </form> */}
    </>
  );
}

import * as Yup from "yup";
import { useId } from "react";
// import { ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
export default function ContactForm({ onAdd }) {
  const idName = useId();
  const idNumber = useId();
  const idCard = nanoid();
  const initialValues = {
    id: idCard,
    name: "",
    number: "",
  };
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
    onAdd({ ...values, id: idCard });
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
    </>
  );
}

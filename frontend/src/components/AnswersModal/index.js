import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import toastError from "../../errors/toastError";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "100%",
  },

  extraAttr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnWrapper: {
    position: "relative",
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  textFieldShortcutContainer: {
    width: "100%",
  },
  textFieldTitleContainer: {
    width: "100%",
  },
  textFieldMessageContainer: {
    width: "100%",
  },
}));

const AnswerSchema = Yup.object().shape({
  shortcut: Yup.string()
    .min(
      2,
      "O shortcut é muito curto, informe um shortcut no mínimo 2 caracteres"
    )
    .max(15, "Informe um shortcut no máximo 15 caracteres")
    .required("Required"),

  title: Yup.string()
    .min(2, "O titulo é muito curto, informe um titulo no mínimo 2 caracteres")
    .max(30, "Informe um titulo no máximo 30 caracteres")
    .required("Required"),

  message: Yup.string()
    .min(
      8,
      "O message é muito curto, informe uma mensagem no mínimo 8 caracteres"
    )
    .max(20000, "Informe uma mensagem de no máximo 20.000 caracteres")
    .required("Required"),
});

const AnswersModal = ({ open, onClose, answerId, initialValues, onSave }) => {
  const classes = useStyles();
  const isMounted = useRef(true);

  const initialState = {
    shortcut: "",
    title: "",
    message: "",
  };

  const [answer, setAnswer] = useState(initialState);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchAnswer = async () => {
      if (initialValues) {
        setAnswer((prevState) => {
          return { ...prevState, ...initialValues };
        });
      }

      if (!answerId) return;

      try {
        const { data } = await api.get(`/answers/${answerId}`);
        if (isMounted.current) {
          setAnswer(data);
        }
      } catch (err) {
        toastError(err);
      }
    };

    fetchAnswer();
  }, [answerId, open, initialValues]);

  const handleClose = () => {
    onClose();
    setAnswer(initialState);
  };

  const handleSaveAnswer = async (values) => {
    try {
      if (answerId) {
        await api.put(`/answers/${answerId}`, values);
        handleClose();
      } else {
        const { data } = await api.post("/answers", values);
        if (onSave) {
          onSave(data);
        }
        handleClose();
      }
      toast.success(i18n.t("answerModal.success"));
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">
          {answerId
            ? `${i18n.t("answerModal.title.edit")}`
            : `${i18n.t("answerModal.title.add")}`}
        </DialogTitle>
        <Formik
          initialValues={answer}
          enableReinitialize={true}
          validationSchema={AnswerSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveAnswer(values);
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent dividers>
                <div className={classes.textFieldShortcut}>
                  <Field
                    as={TextField}
                    label={i18n.t("answerModal.form.shortcut")}
                    name="shortcut"
                    autoFocus
                    error={touched.shortcut && Boolean(errors.shortcut)}
                    helperText={touched.shortcut && errors.shortcut}
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    fullWidth
                  />
                </div>
                <div className={classes.textFieldTitle}>
                  <Field
                    as={TextField}
                    label={i18n.t("answerModal.form.title")}
                    name="title"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    fullwidth
                  />
                </div>
                <div className={classes.textFieldMessage}>
                  <Field
                    as={TextField}
                    label={i18n.t("answerModal.form.message")}
                    name="message"
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    multiline
                    rows={5}
                    fullWidth
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  {i18n.t("answerModal.buttons.cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {answerId
                    ? `${i18n.t("answerModal.buttons.okEdit")}`
                    : `${i18n.t("answerModal.buttons.okAdd")}`}
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AnswersModal;

import React, { useState, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";

import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import AnswersModal from "../../components/AnswersModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import toastError from "../../errors/toastError";

const reducer = (state, action) => {
  if (action.type === "LOAD_ANSWERS") {
    const answers = action.payload;
    const newAnswers = [];

    answers.forEach((answer) => {
      const answerIndex = state.findIndex((u) => u.id === answer.id);
      if (answerIndex !== -1) {
        state[answerIndex] = answer;
      } else {
        newAnswers.push(answer);
      }
    });

    return [...state, ...newAnswers];
  }

  if (action.type === "UPDATE_ANSWERS") {
    const answer = action.payload;
    const answerIndex = state.findIndex((u) => u.id === answer.id);

    if (answerIndex !== -1) {
      state[answerIndex] = answer;
      return [...state];
    } else {
      return [answer, ...state];
    }
  }

  if (action.type === "DELETE_ANSWER") {
    const answerId = action.payload;

    const answerIndex = state.findIndex((u) => u.id === answerId);
    if (answerIndex !== -1) {
      state.splice(answerIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }
};

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles,
  },
  iconActions: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  customTableCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(14),
    border: "1px solid #dadde9",
    maxWidth: 450,
  },
  tooltipPopper: {
    textAlign: "center",
  },
}));

const Answers = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(null);
  const [deletingAnswers, setDeletingAnswers] = useState(null);
  const [answersModalOpen, setAnswersModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [answers, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const fetchAnswers = async () => {
        try {
          const { data } = await api.get("/answers/", {
            params: { searchParam, pageNumber },
          });
          dispatch({ type: "LOAD_ANSWERS", payload: data.answers });
          setHasMore(data.hasMore);
          setLoading(false);
        } catch (err) {
          toastError(err);
        }
      };
      fetchAnswers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchParam, pageNumber]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    socket.on("answer", (data) => {
      if (data.action === "update" || data.action === "create") {
        dispatch({ type: "UPDATE_ANSWERS", payload: data.answer });
      }

      if (data.action === "delete") {
        dispatch({ type: "DELETE_ANSWER", payload: +data.answerId });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenAnswersModal = () => {
    setSelectedAnswers(null);
    setAnswersModalOpen(true);
  };

  const handleCloseAnswersModal = () => {
    setSelectedAnswers(null);
    setAnswersModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchParam(event.target.value.toLowerCase());
  };

  const handleEditAnswers = (answer) => {
    setSelectedAnswers(answer);
    setAnswersModalOpen(true);
  };

  const handleDeleteAnswers = async (answerId) => {
    try {
      await api.delete(`/answers/${answerId}`);
      toast.success(i18n.t("answers.toasts.deleted"));
    } catch (err) {
      toastError(err);
    }
    setDeletingAnswers(null);
    setSearchParam("");
    setPageNumber(1);
  };

  const loadMore = () => {
    setPageNumber((prevState) => prevState + 1);
  };

  const handleScroll = (e) => {
    if (!hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - (scrollTop + 100) < clientHeight) {
      loadMore();
    }
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title={
          deletingAnswers &&
          `${i18n.t("answers.confirmationModal.deleteTitle")} ${
            deletingAnswers.title
          }?`
        }
        open={confirmModalOpen}
        onClose={setConfirmModalOpen}
        onConfirm={() => handleDeleteAnswers(deletingAnswers.id)}
      >
        {i18n.t("answers.confirmationModal.deleteMessage")}
      </ConfirmationModal>
      <AnswersModal
        open={answersModalOpen}
        onClose={handleCloseAnswersModal}
        aria-labelledby="form-dialog-title"
        answerId={selectedAnswers && selectedAnswers.id}
      />
      <MainHeader>
        <Title>{i18n.t("answers.title")}</Title>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder={i18n.t("contacts.searchPlaceholder")}
            type="search"
            value={searchParam}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />
          <Fab
            color="primary"
            aria-label="add"
            title={i18n.t("answers.buttons.add")}
            // className={classes.iconActions}
            onClick={handleOpenAnswersModal}
          >
            <AddIcon />
          </Fab>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper
        className={classes.mainPaper}
        variant="outlined"
        onScroll={handleScroll}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {i18n.t("answers.table.shortcut")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("answers.table.title")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("answers.table.message")}
              </TableCell>
              <TableCell align="center">
                {i18n.t("answers.table.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {answers.map((answer) => (
                <TableRow key={answer.id}>
                  <TableCell align="center">{answer.shortcut}</TableCell>
                  <TableCell align="center">{answer.title}</TableCell>
                  <TableCell align="center">{answer.message}</TableCell>
                  <TableCell align="center">
                    <Fab
                      color="primary"
                      title={i18n.t("answers.buttons.edit")}
                      className={classes.iconActions}
                      size="small"
                      onClick={() => handleEditAnswers(answer)}
                    >
                      <EditIcon />
                    </Fab>

                    <Fab
                      color="secondary"
                      title={i18n.t("answers.buttons.delete")}
                      className={classes.iconActions}
                      size="small"
                      onClick={(e) => {
                        setConfirmModalOpen(true);
                        setDeletingAnswers(answer);
                      }}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
              {loading && <TableRowSkeleton columns={3} />}
            </>
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Answers;

import { Button, Grid, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useRouteMatch } from "react-router-dom";
import { failureToast } from "../../util/util";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

function ChatComponent(props: any) {
  const classes = useStyles();
  const [chatList, setChatList] = React.useState<any>([]);
  const [text, setText] = React.useState<any>("");
  // let messagesEnd: any = React.useRef();
  const { params }: any = useRouteMatch();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatList();
    }, 1000);
    return () => clearInterval(interval); // eslint-disable-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchChatList = () => {
    axios
      .get("/api/v1/chat/" + params.id)
      .then((response: any) => {
        const result = response.data.map((chat: any) => {
          return {
            position: chat.chatFrom === user.username ? "right" : "left",
            type: "text",
            text: chat.text,
            date: new Date(chat.chatTime),
          };
        });
        setChatList(result);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const sendChat = (row: any) => {
    axios
      .post("/api/v1/chat/send/" + params.id, {
        orderId: params.id,
        chatFrom: user.username,
        text: text,
      })
      .then((response: any) => {
        // scrollToBottom();
        setText("");
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  // const scrollToBottom = () => {
  //   messagesEnd.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader avatar={<ChatIcon></ChatIcon>} title="Chat History"/>
        <hr></hr>
        <CardContent
          style={{ minHeight: "30vh", height: "30vh", overflow: "auto" }}
        >
          <MessageList
            className="message-list"
            dataSource={chatList}
            // ref={(el: any) => {
            //   messagesEnd = el;
            // }}
          />
        </CardContent>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ maxLength: 40 }}
                margin="dense"
                onChange={(event: any) => {
                  setText(event.target.value);
                }}
                value={text}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={sendChat}>
                SEND
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
export const ChatUser = withSnackbar(ChatComponent);

import HomeLayout from '../components/HomeLayout';
import Chat from "../components/Chat.tsx";
import Stack from "@mui/material/Stack";
import {ChatbotPngOnlyRobotIcon} from "../components/signin/CustomIcons.tsx";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import InputChatBox from "../components/InputChatBox.tsx";
export default function Home() {
    const [showWelcome] = useState(false);
  return (

      <HomeLayout>
          <Stack direction="column" spacing={2}>
              {showWelcome ? (
                  <Stack direction={"column"} alignItems={"center"} spacing={2} paddingTop={50}>
                      <ChatbotPngOnlyRobotIcon />
                      <Typography variant="h2" component="div">
                          How can I help you today?
                      </Typography>
                  </Stack>) : (
                  <Chat />
              )
              }

              {/* Input text box */}
              <InputChatBox />
          </Stack>

      </HomeLayout>
  );
}

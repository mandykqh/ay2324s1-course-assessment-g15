import { Box, Grid, Button, Center, useToast } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import { MatchingCacheContext } from "../contexts/MatchingCacheContext";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import LoadingPage from "./LoadingPage";
import { showError, showSuccess } from "../Util";
import MatchingForm from "../components/matching/MatchingForm";
import { MatchingString, emptyMatchingString } from "../Commons";
import TimerModal from "../components/matching/modals/TimerModal";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import MatchingSocketHandler from "../handlers/MatchingSocketHandler";
import Match from "../models/match/Match";
import { useNavigate } from "react-router-dom";
import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import { QuestionString } from '../Commons';


const CollaboratePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const toast = useToast();
  const matchingSocket = MatchingSocketHandler.getSocket();
  const [matchingCache, setMatchingCache] = useState<MatchingString>(emptyMatchingString);
  const ctxValue = { matchingCache: matchingCache, setMatchingCache: setMatchingCache };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchMessage, setMatchMessage] = useState<string>('');
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });

    // Redirect to collaboration room if matched
    if (LocalStorageHandler.isMatched()) {
      navigate('/collaborate/code');
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function cancelMatch(matchingCache: MatchingString) {
    try {
      const matchData = new Match(
        LocalStorageHandler.getUserData()!.id.toString(),
        matchingCache.categories,
        matchingCache.complexity
      );
      await MatchingSocketHandler.cancelMatch(matchData);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e)
    }
  }

  async function findMatch(matchingCache: MatchingString) {
    setIsTimeout(false);
    setMatchMessage('');
    if (matchingCache.categories.length === 0) {
      showError('Please select at least one category', toast);
      return;
    }
    if (matchingCache.complexity.length === 0) {
      showError('Please select a complexity level', toast);
      return;
    }

    // try {
    //   QuestionRequestHandler.getAllFilteredQuestions(matchingCache.categories,
    //     matchingCache.complexity).then((questions: QuestionString[]) => {
    //       console.log('qn req handler');
    //       if (questions.length === 0) {
    //         console.log('no qn');
    //         showError('No question available specified in this criteria. Try again with another category or complexity level.', toast);
    //         return;
    //       }
    //     });
    // } catch (error) {
    //   showError('Failed to check question availability', toast);
    //   return;
    // }
    try {
      const filteredQuestions = await QuestionRequestHandler.getAllFilteredQuestions(matchingCache.categories, matchingCache.complexity);
      if (filteredQuestions.length === 0) {
        console.log('no qn');
        showError('No question available specified in this criteria. Try again with another category or complexity level.', toast);
        return; // Exit the entire findMatch function
      }
    } catch (error) {
      showError('Failed to check question availability', toast);
      return;
    }

    try {
      handleOpenModal();
      const matchData = new Match(
        LocalStorageHandler.getUserData()!.id.toString(),
        matchingCache.categories,
        matchingCache.complexity
      );
      matchingSocket.connect();
      matchingSocket.on('finding_match', (data) => {
        console.log(data);
        setMatchMessage("Finding match...");
      });

      matchingSocket.on('match_found', (data: any) => {
        console.log(data);
        setIsMatchFound(true);
        setMatchMessage(data.msg);
        LocalStorageHandler.storeMatchData(data);
        matchingSocket.disconnect();
        navigate('/collaborate/code');
      });

      matchingSocket.on('timeout', (data) => {
        setIsTimeout(true);
        setMatchMessage("Connection timed out. Please try again!");
        matchingSocket.disconnect();
      });

      await MatchingSocketHandler.findMatch(matchData);
    } catch (e) {
      console.log(e);
    }
  }

  if (isAuthenticated) {
    return (
      <MatchingCacheContext.Provider value={ctxValue}>
        <Box>
          <NavigationBar index={1} />
          <Center height='100vh'>
            <Grid gap={4}>
              <MatchingForm />
              <Button
                colorScheme="blue"
                onClick={() => findMatch(matchingCache)}
              >
                Find Match
              </Button>
            </Grid>
            <TimerModal
              isOpen={isModalOpen}
              onClose={() => cancelMatch(matchingCache)}
              initialTime={30}
              status={matchMessage.toString()}
              isTimeout={isTimeout}
              isMatchFound={isMatchFound}
            />
          </Center>
        </Box>
      </MatchingCacheContext.Provider>
    );
  } else {
    return <LoadingPage />
  }
}

export default CollaboratePage;
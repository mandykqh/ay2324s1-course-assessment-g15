import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridItem, Box, Grid, Button, Center, useToast } from "@chakra-ui/react";
import Match from "../models/match/Match";
import LoadingPage from "./LoadingPage";
import NavigationBar from "../components/NavigationBar";
import MatchingForm from "../components/matching/MatchingForm";
import TimerModal from "../components/matching/modals/TimerModal";
import { MatchingCacheContext } from "../contexts/MatchingCacheContext";
import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import HistoryRequestHandler from '../handlers/HistoryRequestHandler';
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import MatchingSocketHandler from "../handlers/MatchingSocketHandler";
import { authChecker, showError, showSuccess } from "../Util";
import { MatchingString, emptyMatchingString } from "../Commons";

const CollaboratePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const matchingSocket = MatchingSocketHandler.getSocket();
  const [matchingCache, setMatchingCache] = useState<MatchingString>(emptyMatchingString);
  const ctxValue = { matchingCache: matchingCache, setMatchingCache: setMatchingCache };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchMessage, setMatchMessage] = useState<string>('');
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  authChecker(setIsAuthenticated);

  // Redirect User to collaboration room if user is already matched
  useEffect(() => {
    if (LocalStorageHandler.isMatched()) {
      navigate('/collaborate/code');
    }
  }, []);

  function renderTimerModal() {
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
        showError((e as Error).message, toast);
      }
    }
    return (
      <TimerModal
        isOpen={isModalOpen}
        onClose={() => cancelMatch(matchingCache)}
        initialTime={30}
        status={matchMessage.toString()}
        isTimeout={isTimeout}
        isMatchFound={isMatchFound}
      />
    );
  }

  function renderFindMatchButton() {
    function updateHistory() {
      let date = new Date();
      const userData = LocalStorageHandler.getUserData();
      const matchQuestionData = LocalStorageHandler.getMatchData()?.question;
      if (userData && matchQuestionData) {
        HistoryRequestHandler.updateHistory({
          userId: userData.id,
          attempt: {
            questionId: matchQuestionData.id,
            timestamp: date.toISOString(),
          },
          complexity: matchQuestionData.complexity!
        });
      }
    }

    async function findMatch(matchingCache: MatchingString) {
      const matchCategories = matchingCache.categories;
      const matchComplexity = matchingCache.complexity;
      setIsTimeout(false);
      setMatchMessage('');

      if (matchCategories.length === 0) {
        showError('Please select at least one category', toast);
        return;
      }
      if (matchComplexity.length === 0) {
        showError('Please select a complexity level', toast);
        return;
      }

      // Validate user input
      try {
        const check = await QuestionRequestHandler.checkMatchFilter(matchCategories, matchComplexity);
        // if check is an object, it means there is no question available
        if (typeof check === 'object') {
          const errorMessage = `${check.message} ${check.emptyCategories.join(",")}`;
          showError(errorMessage, toast);
          return; // Exit the entire findMatch function
        }
      } catch (error) {
        showError('Failed to check question availability', toast);
        return;
      }

      const handleFindingMatch = () => {
        setMatchMessage("Finding match...")
      }

      const handleMatchFound = (data: any) => {
        setIsMatchFound(true);
        setMatchMessage(data.msg);
        LocalStorageHandler.storeMatchData(data);
        matchingSocket.disconnect();
        updateHistory();
        navigate('/collaborate/code');
      }

      const handleTimeOut = () => {
        setIsTimeout(true);
        setMatchMessage("Connection timed out. Please try again!");
        matchingSocket.disconnect();
      }

      // Attempt matching with collaboration service
      try {
        const matchData = new Match(
          LocalStorageHandler.getUserData()!.id.toString(),
          matchCategories,
          matchComplexity
        );
        setIsModalOpen(true);
        matchingSocket.connect();
        matchingSocket.on('finding_match', handleFindingMatch);
        matchingSocket.on('match_found', (data: any) => handleMatchFound(data));
        matchingSocket.on('timeout', handleTimeOut);
        await MatchingSocketHandler.findMatch(matchData);
      } catch (e) {
        showError((e as Error).message, toast);
      }
    }
    return (
      <Button
        w='100%'
        mt='40px'
        colorScheme="blue"
        onClick={() => findMatch(matchingCache)}
      >
        Find Match
      </Button>
    );
  }

  function renderInnerContent() {
    return (
      <Center height='100vh'>
        <Grid gap={4} >
          <GridItem bg='primary.blue3'
            p='30px'
            borderRadius={10}
            border='2px solid #244153'
            boxShadow='lg' >
            <MatchingForm />
            {renderFindMatchButton()}
          </GridItem>
        </Grid>
        {renderTimerModal()}
      </Center>
    );
  }

  function renderAuthenticatedPage() {
    return (
      <MatchingCacheContext.Provider value={ctxValue}>
        <Box >
          <NavigationBar index={1} />
          {renderInnerContent()}
        </Box>
      </MatchingCacheContext.Provider >
    );
  }

  authChecker(setIsAuthenticated);
  return isAuthenticated ? renderAuthenticatedPage() : <LoadingPage />
}

export default CollaboratePage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, Center, useToast } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import LoadingPage from "./LoadingPage";
import MatchingForm from "../components/matching/MatchingForm";
import TimerModal from "../components/matching/modals/TimerModal";
import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import HistoryRequestHandler from '../handlers/HistoryRequestHandler';
import MatchingSocketHandler from "../handlers/MatchingSocketHandler";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import Match from "../models/match/Match";
import { authChecker, showError } from "../Util";
import { MatchingString, emptyMatchingString } from "../Commons";
import { MatchingCacheContext } from "../contexts/MatchingCacheContext";

const CollaboratePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const matchingSocket = MatchingSocketHandler.getSocket();
  const [matchingCache, setMatchingCache] = useState<MatchingString>(emptyMatchingString);
  const ctxValue = { matchingCache: matchingCache, setMatchingCache: setMatchingCache };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchMessage, setMatchMessage] = useState<string>('');
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to collaboration room if matched
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
        showError((e as Error).message, toast)
      }
    }

    return (
      <TimerModal
        isOpen={isModalOpen}
        onClose={() => cancelMatch(matchingCache)}
        initialTime={3}
        status={matchMessage.toString()}
        isTimeout={isTimeout}
        isMatchFound={isMatchFound}
      />
    );
  }

  function renderFindMatchButton() {
    function updateHistory() {
      let date = new Date();
      HistoryRequestHandler.updateHistory({
        userId: LocalStorageHandler.getUserData()?.id!,
        attempt: {
          questionId: LocalStorageHandler.getMatchData()?.question.id!,
          timestamp: date.toISOString(),
        },
        complexity: LocalStorageHandler.getMatchData()?.question.complexity!
      });
    }

    async function findMatch(matchingCache: MatchingString) {
      // Reset State
      setIsTimeout(false);
      setMatchMessage('');

      // Validate user input
      if (matchingCache.categories.length === 0 || matchingCache.complexity.length === 0) {
        let errorMessage = matchingCache.categories.length === 0
          ? 'Please select at least one category' : 'Please select a complexity level';
        showError(errorMessage, toast);
        return;
      }

      try {
        const check = await QuestionRequestHandler.checkMatchFilter(matchingCache.categories, matchingCache.complexity);
        // if check is an object, it means there is no question available
        if (typeof check === 'object') {
          showError(`${check.message} ${check.emptyCategories.join(",")}`, toast);
          return; // Exit the entire findMatch function
        }
      } catch (error) {
        showError('Failed to check question availability', toast);
        return;
      }

      // Attempt matching with collaboration service
      try {
        setIsModalOpen(true);
        const matchData = new Match(
          LocalStorageHandler.getUserData()!.id.toString(),
          matchingCache.categories,
          matchingCache.complexity
        );
        matchingSocket.connect();
        matchingSocket.on('finding_match', (data) => {
          setMatchMessage("Finding match...");
        });

        matchingSocket.on('match_found', (data: any) => {
          setIsMatchFound(true);
          setMatchMessage(data.msg);
          LocalStorageHandler.storeMatchData(data);
          matchingSocket.disconnect();
          updateHistory();
          navigate('/collaborate/code');
        });

        matchingSocket.on('timeout', (data) => {
          setIsTimeout(true);
          setMatchMessage("Connection timed out. Please try again!");
          matchingSocket.disconnect();
        });

        await MatchingSocketHandler.findMatch(matchData);
      } catch (e) {
        showError((e as Error).message, toast)
      }
    }

    return (
      <Button
        colorScheme="blue"
        onClick={() => findMatch(matchingCache)}
      >
        Find Match
      </Button>
    );
  }

  function renderAuthenticatedPage() {
    return (
      <MatchingCacheContext.Provider value={ctxValue}>
        <Box>
          <NavigationBar index={1} />
          <Center height='100vh'>
            <Grid gap={4}>
              <MatchingForm />
              {renderFindMatchButton()}
              {renderTimerModal()}
            </Grid>
          </Center>
        </Box>
      </MatchingCacheContext.Provider>
    );
  }

  authChecker(setIsAuthenticated);
  return isAuthenticated ? renderAuthenticatedPage() : <LoadingPage />
}

export default CollaboratePage;

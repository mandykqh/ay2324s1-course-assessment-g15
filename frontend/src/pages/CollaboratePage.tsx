import { Box, Grid, Button, Center, useToast } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import { MatchingCacheContext } from "../contexts/MatchingCacheContext";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import LoadingPage from "./LoadingPage";
// import MatchFinderComponent from "../components/matching/MatchFinderComponent";
import { showError, showSuccess } from "../Util";
import MatchingForm from "../components/matching/MatchingForm";
import { MatchingString, emptyMatchingString } from "../Commons";

const CollaboratePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const toast = useToast();
  const [matchingCache, setMatchingCache] = useState<MatchingString>(emptyMatchingString);
  const ctxValue = { matchingCache: matchingCache, setMatchingCache: setMatchingCache };

  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  async function findMatch(matchingCache: MatchingString) {
    if (matchingCache.categories.length === 0) {
      showError('Please select at least one category', toast);
      return;
    }
    if (matchingCache.complexity.length === 0) {
      showError('Please select a complexity level', toast);
      return;
    }
    console.log(matchingCache);
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
          </Center>
        </Box>
      </MatchingCacheContext.Provider>
    );
  } else {
    return <LoadingPage />
  }
}

export default CollaboratePage;
import React, { useEffect, useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import HistoryOverview from "../../history/HistoryOverview";
import PastAttempts from "../../history/PastAttempts";
import HistoryRequestHandler from "../../../handlers/HistoryRequestHandler";
import { Attempt } from "../../../Commons";
import QuestionRequestHandler from "../../../handlers/QuestionRequestHandler";

const UserHistory = () => {

  const [total, setTotal] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    HistoryRequestHandler.getHistory()
      .then((r) => {
        QuestionRequestHandler.getQuestionsCount().then(r => setTotal(r));
        setTotal(100);
        setAttempted(parseInt(r.total));
        setEasy(parseInt(r.easy));
        setMedium(parseInt(r.medium));
        setHard(parseInt(r.hard));
        QuestionRequestHandler.loadQuestions().then((qns) => {
          let updatedAttempts = r.attempts.map((entry) => {
            return {
              questionId:
                qns.filter((q) =>
                  q.id === entry.questionId)[0].title, timestamp: entry.timestamp
            }
          });
          setAttempts(updatedAttempts);
        });
      });
  }, []);


  return (
    <Box>
      <Stack>
        <Box pb={3} borderBottom={'1px solid #999'} mb={3}>
          <Text fontSize={24}>
            Attempts Overview
          </Text>
        </Box>
        <HistoryOverview
          total={total}
          attempted={attempted}
          easy={easy}
          medium={medium}
          hard={hard}
        />
        <Stack>
          <Box pb={3} pt={5} borderBottom={'1px solid #999'} mb={3}>
            <Text fontSize={24}>
              Recent Attempts
            </Text>
          </Box>
          {attempted > 0 && <PastAttempts attempts={attempts} />}
          {attempted === 0 && <Text>No Past attempts!</Text>}
        </Stack>
      </Stack>
    </Box >
  );
}

export default UserHistory;
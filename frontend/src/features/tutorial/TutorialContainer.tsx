import { Box, Tab } from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab'
import { useState } from "react";
import LessonOne from "./lesson001/LessonOne";
import LessonTwo from "./lesson002/LessonTwo";
import LessonThree from "./lesson3/LessonThree";
import LessonFour from "./lesson4/LessonFour";

const TutorialContainer: React.FC = () => {
  const [value, setValue] = useState<string>('1');

  return (
    <Box sx={{width: '100%', height: '100%'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_e,newValue)=> setValue(newValue)}>
            <Tab label="Lesson One" value="1" />
            <Tab label="Lesson Two" value="2" />
            <Tab label="Lesson Three" value="3" />
            <Tab label="Lesson Four" value="4" />

          
          </TabList>
        </Box>

          <TabPanel value="1"><LessonOne></LessonOne></TabPanel>
          <TabPanel value="2"><LessonTwo></LessonTwo></TabPanel>
          <TabPanel value="3"><LessonThree></LessonThree></TabPanel>
          <TabPanel value="4"><LessonFour></LessonFour></TabPanel>



      </TabContext>
    </Box>
  );
};

export default TutorialContainer;

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import LessonOne from "./lesson001/LessonOne";
import LessonTwo from "./lesson002/LessonTwo";
import LessonThree from "./lesson3/LessonThree";
import LessonFour from "./lesson4/LessonFour";
import LessonFive from "./lesson5/LessonFive";
import LessonSix from "./lesson6/LessonSix";
import LessonSeven from "./lesson7/LessonSeven";
import LessonEight from "./lesson8/LessonEight";
import LessonNine from "./lesson9/LessonNine";
import ThinkingInReact from "./thinkingInReact/thinkingInReact";

const TutorialContainer: React.FC = () => {
  const [value, setValue] = useState<string>("1");

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(_e, newValue) => setValue(newValue)} variant="scrollable" scrollButtons="auto">
            <Tab label="Lesson One" value="1" />
            <Tab label="Lesson Two" value="2" />
            <Tab label="Lesson Three" value="3" />
            <Tab label="Lesson Four" value="4" />
            <Tab label="Lesson Five" value="5" />
            <Tab label="Lesson Six" value="6" />
            <Tab label="Lesson Seven" value="7" />
            <Tab label="Lesson Eight" value="8" />
            <Tab label="Lesson Nine" value="9" />
            <Tab label="Lesson Thinking in React" value="thinkingInReact" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <LessonOne></LessonOne>
        </TabPanel>
        <TabPanel value="2">
          <LessonTwo></LessonTwo>
        </TabPanel>
        <TabPanel value="3">
          <LessonThree></LessonThree>
        </TabPanel>
        <TabPanel value="4">
          <LessonFour></LessonFour>
        </TabPanel>
        <TabPanel value="5">
          <LessonFive></LessonFive>
        </TabPanel>
        <TabPanel value="6">
          <LessonSix></LessonSix>
        </TabPanel>
        <TabPanel value="7">
          <LessonSeven></LessonSeven>
        </TabPanel>
        <TabPanel value="8">
          <LessonEight></LessonEight>
        </TabPanel>
        <TabPanel value="9">
          <LessonNine></LessonNine>
        </TabPanel>
        <TabPanel value="thinkingInReact">
          <ThinkingInReact></ThinkingInReact>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TutorialContainer;

import React, { useContext, useState } from "react";

import { fetcher, mutationFetcher, useApiSWR, useApiSWRMutation } from "units/swr";
import type { ConferenceDto } from "types";
import { endpoints, toast } from "utils";
import { useTranslation } from "react-i18next";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { mutate } from "swr";
import { EmailProvider, useEmail } from "features/home/EmailContext";
import ConferenceListFilters from "features/MyConferences/ConferenceListFilters";
import ConferenceList from "features/MyConferences/ConferenceList";
import { useSubscription } from "units/notifications";
import { notificationTypes } from "constants";

const AllConferencesContainer: React.FC<{ canEdit?: boolean }> = ({ canEdit = false }) => {
  const { t } = useTranslation();

  const [filterText, setFilterText] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<Date | undefined>();
  const [filterEndDate, setFilterEndDate] = useState<Date | undefined>();
  const [filterConferenceTypeName, setFilterConferenceTypeName] = useState<string>("");
  const [filterCountry, setFilterCountry] = useState<string>("");
  const [filterCounty, setFilterCounty] = useState<string>("");
  const [filterCity, setFilterCity] = useState<string>("");

  // const { data: users } = useApiSWR<DictionaryItem[], Error>(endpoints.dictionaries.categories, {
  //   onError: (err) => toast.error(t("User.Error", { message: err.message }))
  // });
  const { data: allConferences = [], mutate: refetchConferenceList } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });

  const [speakers, setSpeakers] = useState([{ confSp: "", id: "", name: "", nationality: "", rating: "", main: false }]);

  const [currentConferenceId, setCurrentConferenceId] = useState<number>(0);

  const { data: conferenceById } = useApiSWR<ConferenceDto, Error>(
    currentConferenceId > 0 ? endpoints.conferences.getConferenceById(currentConferenceId) : null,
    {
      onError: (err) => toast.error(t("Error loading conference", { message: err.message }))
    }
  );

  useSubscription(notificationTypes.ATTENDANCESTATUSCHANGED, {
    onNotification: () => {
      refetchConferenceList();
      //toast.info(t("Conferences.ATTENDANCESTATUSCHANGED"));
    }
  });

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          padding: "10px"
        }}
      >
        <ConferenceListFilters
          filterText={filterText}
          onFilterTextChange={setFilterText}
          filterStartDate={filterStartDate}
          onFilterStartDateChange={setFilterStartDate}
          filterEndDate={filterEndDate}
          onFilterEndDateChange={setFilterEndDate}
          filterConferenceTypeName={filterConferenceTypeName}
          onFilterConferenceTypeNameChange={setFilterConferenceTypeName}
          filterCity={filterCity}
          onFilterCityChange={setFilterCity}
          filterCountry={filterCountry}
          onFilterCountryChange={setFilterCountry}
          filterCounty={filterCounty}
          onFilterCountyChange={setFilterCounty}
        />
      </div>
      <div>
        <ConferenceList
          conferences={allConferences}
          filterText={filterText}
          filterStartDate={filterStartDate}
          filterEndDate={filterEndDate}
          filterConferenceTypeName={filterConferenceTypeName}
          filterCity={filterCity}
          filterCounty={filterCounty}
          filterCountry={filterCountry}
          canEdit={canEdit}
        />
      </div>
    </div>
  );
};

export default AllConferencesContainer;

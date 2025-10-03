import React, { useState } from "react";
import ConferenceList from "./ConferenceList";
import ConferenceListFilters from "./ConferenceListFilters";
import { useApiSWR } from "units/swr";
import type { ConferenceDto } from "types";
import { endpoints, toast } from "utils";
import { useTranslation } from "react-i18next";

const ConferenceContainer: React.FC = () => {
  const { t } = useTranslation();

  const [filterText, setFilterText] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<Date>(new Date());
  const [filterEndDate, setFilterEndDate] = useState<Date>(new Date());

  // const { data: users } = useApiSWR<DictionaryItem[], Error>(endpoints.dictionaries.categories, {
  //   onError: (err) => toast.error(t("User.Error", { message: err.message }))
  // });
  const { data: allConferences = [] } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });
  // console.log(data?.at(0)?.name);
  // console.log(data?.[0]?.name);
  // console.log("Categories from API:", data);
  // console.log(conferences);

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <ConferenceListFilters
        filterText={filterText}
        onFilterTextChange={setFilterText}
        filterStartDate={filterStartDate}
        onFilterStartDateChange={setFilterStartDate}
        filterEndDate={filterEndDate}
        onFilterEndDateChange={setFilterEndDate}
      />
      <ConferenceList
        conferences={allConferences}
        filterText={filterText}
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
      />
    </div>
  );
};

export default ConferenceContainer;

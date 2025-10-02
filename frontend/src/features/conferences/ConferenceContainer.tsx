import React, { use, useState } from "react";
import { mockData } from "./mockData";
import ConferenceList from "./ConferenceList";
import ConferenceListFilters from "./ConferenceListFilters";
import { useApiSWR } from "units/swr";
import type { DictionaryItem } from "types";
import { endpoints, toast } from "utils";
import { useTranslation } from "react-i18next";

const ConferenceContainer: React.FC = () => {
  const { t } = useTranslation();

  const [filterText, setFilterText] = useState<string>("");

  const { data } = useApiSWR<DictionaryItem[], Error>(endpoints.dictionaries.categories, {
    onError: (err) => toast.error(t("User.Error", { message: err.message }))
  });
  console.log("Categories from API:", data);

  return (
    <>
      <ConferenceListFilters filterText={filterText} onFilterTextChange={setFilterText} />
      <ConferenceList conferences={mockData} filterText={filterText} />
    </>
  );
};

export default ConferenceContainer;

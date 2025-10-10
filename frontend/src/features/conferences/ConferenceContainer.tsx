import React, { useState } from "react";
import ConferenceList from "./ConferenceList";
import ConferenceListFilters from "./ConferenceListFilters";
import { fetcher, mutationFetcher, useApiSWR, useApiSWRMutation } from "units/swr";
import type { ConferenceDto } from "types";
import { endpoints, toast } from "utils";
import { useTranslation } from "react-i18next";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { mutate } from "swr";

const ConferenceContainer: React.FC = () => {
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
  const { data: allConferences = [] } = useApiSWR<ConferenceDto[], Error>(endpoints.conferences.default, {
    onError: (err) => toast.error(t("Conference.Error", { message: err.message }))
  });

  const { data: conferenceTypes = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.conferenceTypes, {
    onError: (err) => toast.error(t("Error loading conference types: ", { message: err.message }))
  });
  const { data: conferenceCategories = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.categories, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCities = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.cities, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCounties = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.counties, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCountries = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.countries, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [speakers, setSpeakers] = useState([{ confSp: "", id: "", name: "", nationality: "", rating: "", main: false }]);

  const [currentConference, setCurrentConference] = useState<ConferenceDto | null>(null);
  const [currentConferenceId, setCurrentConferenceId] = useState<number>(0);

  const [conferenceName, setConferenceName] = useState("");
  const [conferenceType, setConferenceType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState({
    id: 0,
    name: "",
    code: "",
    address: "",
    countryId: "",
    countyId: "",
    cityId: "",
    latitude: "",
    longitude: ""
  });

  const { data: conferenceById } = useApiSWR<ConferenceDto, Error>(
    currentConferenceId > 0 ? endpoints.conferences.getConferenceById(currentConferenceId) : null,
    {
      onError: (err) => toast.error(t("Error loading conference", { message: err.message }))
    }
  );

  const { trigger: editConference, isMutating: isEditingConference } = useApiSWRMutation(
    endpoints.conferences.saveConference,
    mutationFetcher<{ id: number }>,
    {
      onError: (error) => {
        toast.error(`Error editing conference: ${error.message}`);
      }
    }
  );

  const handleEdit = (c: ConferenceDto) => {
    setCurrentConferenceId(c.id);

    if (conferenceById?.id === c.id) {
      populateConferenceData(conferenceById);
    }
  };
  React.useEffect(() => {
    if (conferenceById && conferenceById.id === currentConferenceId) {
      populateConferenceData(conferenceById);
    }
  }, [conferenceById, currentConferenceId]);

  const populateConferenceData = (conference: ConferenceDto) => {
    setCurrentConference(conference);
    setConferenceName(conference.name || "");
    setConferenceType(conference.conferenceTypeId?.toString() || "");
    setCategory(conference.categoryId?.toString() || "");
    setStartDate(conference.startDate ? new Date(conference.startDate).toISOString().split("T")[0] : "");
    setEndDate(conference.endDate ? new Date(conference.endDate).toISOString().split("T")[0] : "");

    const loc = conference.location || {};
    setLocation({
      id: loc.locationId || 0,
      name: loc.name || "",
      address: loc.address || "",
      code: loc.code || "",
      countryId: loc.countryId?.toString() || "",
      countyId: loc.countyId?.toString() || "",
      cityId: loc.cityId?.toString() || "",
      latitude: loc.latitude?.toString() || "",
      longitude: loc.longitude?.toString() || ""
    });

    const speakerList =
      conference.speakerList?.map((s) => ({
        confSp: s.conferenceSpeakerId.toString() || "",
        id: s.speakerId.toString() || "",
        name: s.name || "",
        nationality: s.nationality || "",
        rating: s.rating?.toString() || "",
        main: s.isMainSpeaker || false
      })) || [];

    setSpeakers(speakerList.length > 0 ? speakerList : [{ confSp: "", id: "", name: "", nationality: "", rating: "", main: false }]);

    setIsDialogOpen(true);
  };

  const { trigger: createConference, isMutating: isCreatingConference } = useApiSWRMutation(
    endpoints.conferences.saveConference,
    mutationFetcher
  );

  const handleCreateNewConference = () => {
    setCurrentConference(null);
    setConferenceName("");
    setConferenceType("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setLocation({
      id: 0,
      name: "",
      address: "",
      code: "",
      countryId: "",
      countyId: "",
      cityId: "",
      latitude: "",
      longitude: ""
    });
    setSpeakers([{ confSp: "", id: "", name: "", nationality: "", rating: "", main: false }]);
    setIsDialogOpen(true);
  };

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <button
        onClick={() => {
          setIsDialogOpen(true);
          handleCreateNewConference();
        }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          fontSize: "32px",
          zIndex: 1000,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        title={t("Add Conference")}
      >
        +
      </button>

      {isDialogOpen && (
        <dialog
          open
          style={{
            padding: "40px",
            width: "90%",
            maxWidth: "1200px",
            zIndex: 11,
            border: "12px",
            borderRadius: "12px",
            boxShadow: "0 50px 30px rgba(0, 0, 0, 0.3)",
            backgroundColor: "#fff"
          }}
        >
          <button
            onClick={() => setIsDialogOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer"
            }}
            title={t("Close")}
          >
            X
          </button>

          <h2 style={{ borderBottom: "2px solid blue", paddingBottom: "10px" }}>{t("Conference Info")}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
            <div>
              <label>{t("Conference Name")}</label>
              <input
                type="text"
                value={conferenceName}
                onChange={(e) => setConferenceName(e.target.value)}
                placeholder={t("Enter conference name")}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label>{t("Conference Type")}</label>
              <select style={{ width: "100%" }} value={conferenceType} onChange={(e) => setConferenceType(e.target.value)}>
                <option value="">{t("Select one...")}</option>
                {conferenceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>{t("Category")}</label>
              <select style={{ width: "100%" }} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">{t("Select one...")}</option>
                {conferenceCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label>{t("Start Date")}</label>
                <input type="date" style={{ width: "100%" }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label>{t("End Date")}</label>
                <input type="date" style={{ width: "100%" }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          <h2 style={{ borderBottom: "2px solid blue", paddingBottom: "10px" }}>{t("Location")}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
            <div>
              <label>{t("Name")}</label>
              <input
                type="text"
                style={{ width: "100%" }}
                value={location.name}
                onChange={(e) => setLocation({ ...location, name: e.target.value })}
              />
            </div>
            <div>
              <label>{t("Address")}</label>
              <input
                type="text"
                value={location.address}
                style={{ width: "100%" }}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
              />
            </div>
            <div>
              <label>{t("Country")}</label>
              <select
                style={{ width: "100%" }}
                value={location.countryId}
                onChange={(e) => setLocation({ ...location, countryId: e.target.value })}
              >
                <option value="">{t("Select one...")}</option>
                {conferenceCountries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>{t("County")}</label>
              <select
                style={{ width: "100%" }}
                value={location.countyId}
                onChange={(e) => setLocation({ ...location, countyId: e.target.value })}
              >
                <option value="">{t("Select one...")}</option>
                {conferenceCounties.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>{t("City")}</label>
              <select
                style={{ width: "100%" }}
                value={location.cityId}
                onChange={(e) => setLocation({ ...location, cityId: e.target.value })}
              >
                <option value="">{t("Select one...")}</option>
                {conferenceCities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label>{t("Latitude")}</label>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  value={location.latitude}
                  onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>{t("Longitude")}</label>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  value={location.longitude}
                  onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
                />
              </div>
            </div>
          </div>

          <h2 style={{ borderBottom: "2px solid blue", paddingBottom: "10px" }}>{t("Speakers")}</h2>

          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 120px 40px",
                gap: "10px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              <div>{t("Name")}</div>
              <div>{t("Nationality")}</div>
              <div>{t("Rating")}</div>
              <div>{t("Main Speaker")}</div>
              <div></div>
            </div>

            {speakers.map((speaker, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 120px 40px",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "10px"
                }}
              >
                <input
                  type="text"
                  value={speaker.name}
                  onChange={(e) => {
                    const updated = [...speakers];
                    updated[index].name = e.target.value;
                    setSpeakers(updated);
                  }}
                />
                <input
                  type="text"
                  value={speaker.nationality}
                  onChange={(e) => {
                    const updated = [...speakers];
                    updated[index].nationality = e.target.value;
                    setSpeakers(updated);
                  }}
                />
                <input
                  type="text"
                  value={speaker.rating}
                  onChange={(e) => {
                    const updated = [...speakers];
                    updated[index].rating = e.target.value;
                    setSpeakers(updated);
                  }}
                />
                <input
                  type="checkbox"
                  checked={speaker.main}
                  onChange={(e) => {
                    const updated = [...speakers];
                    updated[index].main = e.target.checked;
                    setSpeakers(updated);
                  }}
                />
                <button
                  onClick={() => {
                    const updated = [...speakers];
                    updated.splice(index, 1);
                    setSpeakers(updated);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    fontSize: "20px",
                    cursor: "pointer"
                  }}
                  title="Delete Speaker"
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            ))}

            <button
              onClick={() => setSpeakers([...speakers, { confSp: "", id: "", name: "", nationality: "", rating: "", main: false }])}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                fontSize: "20px",
                cursor: "pointer"
              }}
              title="Add Speaker"
            >
              <AddCircleOutlineIcon />
            </button>
          </div>

          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "100px",
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(25, 118, 210, 0.4)"
            }}
            onClick={async () => {
              try {
                const payload = {
                  id: currentConference?.id || 0,
                  conferenceTypeId: Number(conferenceType),
                  location: {
                    locationId: Number(location.id) || 0,
                    name: location.name,
                    code: location.code || "",
                    address: location.address,
                    countryId: Number(location.countryId),
                    countyId: Number(location.countyId),
                    cityId: Number(location.cityId),
                    latitude: Number(location.latitude),
                    longitude: Number(location.longitude)
                  },
                  organizerEmail: "alina@totalsoft.ro",
                  categoryId: Number(category),
                  startDate: new Date(startDate).toISOString(),
                  endDate: new Date(endDate).toISOString(),
                  name: conferenceName,
                  speakerList: speakers.map((s) => ({
                    conferenceSpeakerId: s.confSp || 0,
                    speakerId: s.id || 0,
                    name: s.name,
                    nationality: s.nationality,
                    rating: s.rating ? Number(s.rating) : null,
                    isMainSpeaker: s.main
                  }))
                };

                try {
                  if (payload.id && payload.id > 0) {
                    await editConference(payload);
                    toast.success("conference edited!");
                    await mutate(endpoints.conferences.default);
                  } else {
                    await createConference(payload);
                    toast.success("conference created!");
                  }
                  setIsDialogOpen(false);
                } catch (error) {
                  toast.error("err.");
                  console.error(error);
                }
              } catch (err) {
                console.error("Failed to create conference:", err);
                toast.error("Error creating conference");
              }
            }}
          >
            {t("Save")}
          </button>
        </dialog>
      )}

      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          padding: "10px",
          gap: "10px"
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
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default ConferenceContainer;

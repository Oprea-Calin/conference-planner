import React, { useContext, useState } from "react";
import ConferenceList from "./ConferenceList";
import ConferenceListFilters from "./ConferenceListFilters";
import { fetcher, mutationFetcher, useApiSWR, useApiSWRMutation } from "units/swr";
import type { ConferenceDto } from "types";
import { endpoints, toast } from "utils";
import { useTranslation } from "react-i18next";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { mutate } from "swr";
import { EmailProvider, useEmail } from "features/home/EmailContext";
import { useSubscription } from "units/notifications";
import { notificationTypes } from "constants";
import { Rating } from "@mui/material";
import { set } from "lodash";

const ConferenceContainer: React.FC<{ canEdit?: boolean }> = ({ canEdit = true }) => {
  const { t } = useTranslation();

  const [statusFilter, setStatusFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

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

  const [speakers, setSpeakers] = useState([{ confSp: "", id: "", name: "", nationality: "", rating: "", image: "", main: false }]);

  const [currentConference, setCurrentConference] = useState<ConferenceDto | null>(null);
  const [currentConferenceId, setCurrentConferenceId] = useState<number>(0);

  const { email, setEmail } = useEmail();
  const [conferenceName, setConferenceName] = useState("");
  const [conferenceLink, setConferenceLink] = useState("");

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

  const handleEdit = async (c: ConferenceDto) => {
    setCurrentConferenceId(c.id);

    const freshConference = await mutate(
      endpoints.conferences.getConferenceById(c.id),
      fetcher(endpoints.conferences.getConferenceById(c.id)),
      { revalidate: true }
    );

    if (freshConference) {
      populateConferenceData(freshConference);
    }
  };

  React.useEffect(() => {
    if (conferenceById && conferenceById.id === currentConferenceId) {
      populateConferenceData(conferenceById);
    }
  }, [conferenceById, currentConferenceId]);

  useSubscription(notificationTypes.CONFERENCE_DELETED, {
    onNotification: () => {
      refetchConferenceList();
      toast.info(t("Conferences.ConferenceDeletedNotification"));
    }
  });

  useSubscription(notificationTypes.CONFERENCE_CREATED, {
    onNotification: () => {
      refetchConferenceList();
      toast.info(t("Conferences.ConferenceCreatedNotification"));
    }
  });
  useSubscription(notificationTypes.CONFERENCE_UPDATED, {
    onNotification: () => {
      refetchConferenceList();
      toast.info(t("Conferences.ConferenceUpdatedNotification"));
    }
  });

  const populateConferenceData = (conference: ConferenceDto) => {
    setCurrentConference(conference);
    setConferenceName(conference.name || "");
    setConferenceType(conference.conferenceTypeId?.toString() || "");
    setCategory(conference.categoryId?.toString() || "");
    setStartDate(conference.startDate ? new Date(conference.startDate).toISOString().split("T")[0] : "");
    setEndDate(conference.endDate ? new Date(conference.endDate).toISOString().split("T")[0] : "");
    setConferenceLink(conference.link || "");
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
        image: s.image?.toString() || "",
        main: s.isMainSpeaker || false
      })) || [];

    setSpeakers(speakerList.length > 0 ? speakerList : []);

    setIsDialogOpen(true);
  };
  const handleClearFilters = () => {
    setFilterText("");
    setFilterStartDate(undefined);
    setFilterEndDate(undefined);
    setFilterConferenceTypeName("");
    setFilterCity("");
    setFilterCounty("");
    setFilterCountry("");
    setStatusFilter("");
    setTimeFilter("");
    setStatusFilter("");
    setTimeFilter("");
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
    setConferenceLink("");
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
    setSpeakers([]);
    setIsDialogOpen(true);
  };

  const myConferences = allConferences.filter((conf) => conf.organizerEmail === email);

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <button
        onClick={() => {
          setIsDialogOpen(true);
          handleCreateNewConference();
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "40px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          fontSize: "40px",
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
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "40px",
            width: "90%",
            maxWidth: "1200px",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: 1100,
            border: "none",
            borderRadius: "16px",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.25)",
            background: "linear-gradient(145deg, #ffffff, #f5f5f5)"
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
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#555"
            }}
            title={t("Close")}
          >
            ×
          </button>

          <h2
            style={{
              borderBottom: "2px solid #1976d2",
              paddingBottom: "10px",
              fontSize: "28px",
              marginBottom: "30px",
              color: "#1976d2",
              fontWeight: "600"
            }}
          >
            {t("Conference Info")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "40px"
            }}
          >
            <div>
              <label>{t("Conference Name")}</label>
              <input
                type="text"
                value={conferenceName}
                onChange={(e) => setConferenceName(e.target.value)}
                placeholder={t("Enter conference name")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              />
            </div>

            <div>
              <label>{t("Conference Type")}</label>
              <select
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
                value={conferenceType}
                onChange={(e) => setConferenceType(e.target.value)}
              >
                <option value="">{t("Select one...")}</option>
                {conferenceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {conferenceType === "1" && (
              <div>
                <label>{t("Conference Link")}</label>
                <input
                  type="text"
                  value={conferenceLink}
                  onChange={(e) => setConferenceLink(e.target.value)}
                  placeholder={t("Enter conference link")}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                  }}
                />
              </div>
            )}

            <div>
              <label>{t("Category")}</label>
              <select
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>{t("End Date")}</label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {conferenceType === "2" && (
            <>
              <h2
                style={{
                  borderBottom: "2px solid #1976d2",
                  paddingBottom: "10px",
                  fontSize: "24px",
                  marginBottom: "20px",
                  color: "#1976d2",
                  fontWeight: "500"
                }}
              >
                {t("Location")}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "30px"
                }}
              >
                <div>
                  <label>{t("Name")}</label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
                    value={location.name}
                    onChange={(e) => setLocation({ ...location, name: e.target.value })}
                  />
                </div>
                <div>
                  <label>{t("Address")}</label>
                  <input
                    type="text"
                    value={location.address}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                  />
                </div>
                <div>
                  <label>{t("Country")}</label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
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
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
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
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc"
                    }}
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
                      type="number"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                      }}
                      value={location.latitude}
                      step={0.01}
                      onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>{t("Longitude")}</label>
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                      }}
                      value={location.longitude}
                      step={0.01}
                      onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <h2
            style={{
              borderBottom: "2px solid #1976d2",
              paddingBottom: "10px",
              fontSize: "24px",
              marginTop: "40px",
              marginBottom: "20px",
              color: "#1976d2",
              fontWeight: "500"
            }}
          >
            {t("Speakers")}
          </h2>

          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 120px 40px 40px",
                gap: "10px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              <div>{t("Name")}</div>
              <div>{t("Nationality")}</div>
              <div>{t("Image")}</div>

              <div>{t("Rating")}</div>

              <div>{t("Main Speaker")}</div>

              <div></div>
            </div>

            {speakers.map((speaker, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 120px 40px 40px",
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
                    updated[index].name = e.target.value || "";
                    setSpeakers(updated);
                  }}
                />
                <input
                  type="text"
                  value={speaker.nationality}
                  onChange={(e) => {
                    const updated = [...speakers];
                    updated[index].nationality = e.target.value || "";
                    setSpeakers(updated);
                  }}
                />

                <input
                  type="text"
                  style={{ maxWidth: "250px" }}
                  value={speaker.image}
                  onChange={(e) => {
                    const updated = [...speakers];
                    updated[index].image = e.target.value || "";
                    setSpeakers(updated);
                  }}
                />

                <Rating
                  value={Number(speaker.rating) || 0}
                  precision={0.1}
                  onChange={(_, newValue) => {
                    const updated = [...speakers];
                    updated[index].rating = newValue?.toString() || "0";
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
                    color: "#d32f2f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  x
                </button>
              </div>
            ))}

            <button
              onClick={() =>
                setSpeakers([...speakers, { confSp: "", id: "", name: "", nationality: "", rating: "", image: "", main: false }])
              }
              style={{
                marginTop: "10px",
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {t("Add Speaker")}
            </button>
          </div>

          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "100px",
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(76, 175, 80, 0.4)"
            }}
            onClick={async () => {
              const payload = {
                id: currentConference?.id || 0,
                conferenceTypeId: Number(conferenceType),
                location: {
                  locationId: Number(location.id) || 0,
                  name: location.name || "",
                  code: location.code || "",
                  address: location.address || "",
                  countryId: Number(location.countryId) || 1,
                  countyId: Number(location.countyId) || 1,
                  cityId: Number(location.cityId) || 1,
                  latitude: Number(location.latitude),
                  longitude: Number(location.longitude)
                },
                organizerEmail: email,
                categoryId: Number(category),
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                name: conferenceName,
                link: conferenceLink,
                speakerList: speakers.map((s) => ({
                  conferenceSpeakerId: s.confSp || 0,
                  speakerId: s.id || 0,
                  name: s.name,
                  nationality: s.nationality,
                  image: s.image || "",
                  rating: s.rating ? Number(s.rating) : null,
                  isMainSpeaker: s.main
                }))
              };

              try {
                if (payload.id && payload.id > 0) {
                  await editConference(payload);
                  toast.success("Conference edited!");
                } else {
                  await createConference(payload);
                  toast.success("Conference created!");
                }
                setIsDialogOpen(false);
              } catch (error) {
                toast.error("Something went wrong.");
                console.error(error);
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
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          onClearFilters={handleClearFilters}
        />
      </div>
      <div>
        <ConferenceList
          conferences={myConferences}
          filterText={filterText}
          filterStartDate={filterStartDate}
          filterEndDate={filterEndDate}
          filterConferenceTypeName={filterConferenceTypeName}
          filterCity={filterCity}
          filterCounty={filterCounty}
          filterCountry={filterCountry}
          statusFilter={statusFilter}
          timeFilter={timeFilter}
          onEdit={handleEdit}
          canEdit={true}
        />
      </div>
    </div>
  );
};

export default ConferenceContainer;

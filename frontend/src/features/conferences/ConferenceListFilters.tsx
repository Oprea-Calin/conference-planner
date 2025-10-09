import { Grid } from "@mui/material";
import { t } from "i18next";
import { useApiSWR } from "units/swr";
import { endpoints, toast } from "utils";

const ConferenceListFilters: React.FC<{
  filterText: string;
  onFilterTextChange: (text: string) => void;
  filterStartDate: Date | undefined;
  onFilterStartDateChange: (date: Date | undefined) => void;
  filterEndDate: Date | undefined;
  onFilterEndDateChange: (date: Date | undefined) => void;
  filterConferenceTypeName: string;
  onFilterConferenceTypeNameChange: (conferenceTypeName: string) => void;
  filterCity: string;
  onFilterCityChange: (city: string) => void;
  filterCountry: string;
  onFilterCountryChange: (country: string) => void;
  filterCounty: string;
  onFilterCountyChange: (county: string) => void;
}> = ({
  filterText,
  onFilterTextChange,
  filterStartDate,
  onFilterStartDateChange,
  filterEndDate,
  onFilterEndDateChange,
  filterConferenceTypeName,
  onFilterConferenceTypeNameChange,
  filterCity,
  onFilterCityChange,
  filterCountry,
  onFilterCountryChange,
  filterCounty,
  onFilterCountyChange
}) => {
  const { data: conferenceCities = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.cities, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCounties = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.counties, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceCountries = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.countries, {
    onError: (err) => toast.error(t("Error loading conference categories: ", { message: err.message }))
  });
  const { data: conferenceTypes = [] } = useApiSWR<{ id: number; name: string }[], Error>(endpoints.dictionaries.conferenceTypes, {
    onError: (err) => toast.error(t("Error loading conference types: ", { message: err.message }))
  });

  return (
    <div style={{ zIndex: "10", position: "sticky", top: 0, backgroundColor: "white", paddingBottom: 8 }}>
      <Grid display={"flex"} justifyContent="center" alignItems="center" padding={0}>
        <Grid container spacing={2} size={{ xs: 6, md: 4 }} overflow={"auto"} wrap="nowrap" justifyContent="center">
          <Grid>
            <input
              type="date"
              name="startDate"
              value={filterStartDate ? filterStartDate.toLocaleDateString("en-CA") : ""}
              onChange={(e) => {
                onFilterStartDateChange(new Date(e.target.value));
              }}
              placeholder="Start Date"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="date"
              name="endDate"
              value={filterEndDate ? filterEndDate.toLocaleDateString("en-CA") : ""}
              onChange={(e) => {
                onFilterEndDateChange(new Date(e.target.value));
              }}
              placeholder="End Date"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid>
            <input
              type="text"
              name="conferenceName"
              value={filterText}
              onChange={(e) => onFilterTextChange(e.target.value)}
              placeholder="Name"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid>
          {/* <Grid>
            <input
              type="text"
              name="city"
              value={filterCity}
              onChange={(e) => onFilterCityChange(e.target.value)}
              placeholder="city"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Grid> */}
          <Grid>
            <div>
              <select
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                value={filterCity}
                onChange={(e) => onFilterCityChange(e.target.value)}
              >
                <option value="">{t("City")}</option>
                {conferenceCities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
          <Grid>
            {/* <input
              type="text"
              name="county"
              value={filterCounty}
              onChange={(e) => onFilterCountyChange(e.target.value)}
              placeholder="county"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            /> */}
            <div>
              <select
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                value={filterCounty}
                onChange={(e) => onFilterCountyChange(e.target.value)}
              >
                <option value="">{t("County")}</option>
                {conferenceCounties.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
          <Grid>
            {/* <input
              type="text"
              name="country"
              value={filterCountry}
              onChange={(e) => onFilterCountryChange(e.target.value)}
              placeholder="country"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            /> */}
            <div>
              <select
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                value={filterCountry}
                onChange={(e) => onFilterCountryChange(e.target.value)}
              >
                <option value="">{t("Country")}</option>
                {conferenceCountries.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
          <Grid>
            {/* <input
              type="text"
              name="Type"
              value={filterConferenceTypeName}
              onChange={(e) => onFilterConferenceTypeNameChange(e.target.value)}
              placeholder="Type"
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            /> */}
            <div>
              <select
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                value={filterConferenceTypeName}
                onChange={(e) => onFilterConferenceTypeNameChange(e.target.value)}
              >
                <option value="">{t("Type")}</option>
                {conferenceTypes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConferenceListFilters;
